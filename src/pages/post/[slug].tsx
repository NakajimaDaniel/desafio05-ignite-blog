/* eslint-disable prettier/prettier */
import { GetStaticPaths, GetStaticProps } from 'next';
import Prismic from '@prismicio/client';

import { getPrismicClient } from '../../services/prismic';

import commonStyles from '../../styles/common.module.scss';
import styles from './post.module.scss';
import Header from '../../components/Header';
import { RichText } from 'prismic-dom';


interface Post {
  first_publication_date: string | null;
  data: {
    title: string;
    banner: {
      url: string;
    };
    author: string;
    content: {
      heading: string;
      body: {
        text: string;
      }[];
    }[];
  };
}

interface PostProps {
  post: Post;
}

export default function Post({post}: Post) {
  // TODO
  console.log(post)
  return (
    <div>
      <Header/>
      <div className={styles.main}>
        <img src={post.data.banner.url.url} alt="banner"></img>
        <div className={styles.content}>
        <h1></h1>
        </div>
      </div>
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  // const prismic = getPrismicClient();
  // const posts = await prismic.query();
    //   // TODO  

    return {
      paths: [],
      fallback: 'blocking'
    }


};

export const getStaticProps: GetStaticProps = async ({params}) => {

  const {slug} = params;



  const prismic = getPrismicClient();
  const response = await prismic.getByUID('posts', String(slug), {})

  const post = {
    first_publication_date: response.first_publication_date,
    data: {
      title: response.data.title,
      banner: {
        url: response.data.banner,

      },
      author: response.data.author,
      content: {
        heading: response.data.content.map(reference => {return reference.heading}),
        body: response.data.content.map(reference => { return RichText.asHtml(reference.body)})
      }
    }
  }




  // TODO

  return {
    props: {post}
  }
};

/* eslint-disable prettier/prettier */
import { GetStaticPaths, GetStaticProps } from 'next';
import Prismic from '@prismicio/client';

import { getPrismicClient } from '../../services/prismic';

import commonStyles from '../../styles/common.module.scss';
import styles from './post.module.scss';
import Header from '../../components/Header';

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

export default function Post() {
  // TODO
  return (
    <div>
      <Header/>
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

  const slug = params;

  // console.log(slug)

  // const prismic = getPrismicClient();
  // const response = await prismic.getByUID();

  // TODO

  return {
    props: slug
  }
};

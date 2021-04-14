/* eslint-disable prettier/prettier */
import { GetStaticPaths, GetStaticProps } from 'next';
import Prismic from '@prismicio/client';

import { getPrismicClient } from '../../services/prismic';

import commonStyles from '../../styles/common.module.scss';
import styles from './post.module.scss';
import Header from '../../components/Header';
import { RichText } from 'prismic-dom';
import { FiCalendar, FiUser } from "react-icons/fi";
import { WiTime4 } from 'react-icons/wi';

import ptBR from 'date-fns/locale/pt-BR';
import { format } from 'date-fns';


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

export default function Post({post}) {
  // TODO

  
  function WordCount(str) { 
    return str.split(" ").length;
  }

  function ReadingTime(wordCount) {
    return Math.round(wordCount/200);
  }


  const count = post.data.content.map(post => {
    return post.body.map(body => {
      return WordCount(body.text)
    })
  })

  const countNumber = count.pop().pop()

  const totalTime = ReadingTime(countNumber)



  return (
    <div>
      <Header/>
      <div className={styles.main}>
        <img src={post.data.banner.url} alt="banner"></img>
        <div className={styles.content}>
          <h1>{post.data.title}</h1>

          <div className={styles.info}>
            <FiCalendar/>
            <p>{format(new Date(post.first_publication_date), 'dd MMM yyyy', {locale: ptBR, })}</p>
            <FiUser/>
            <p>{post.data.author}</p>
            <WiTime4/>
            <p>{totalTime} min</p>
          </div>

          {/* <div className={styles.body} dangerouslySetInnerHTML={{__html: post.data.content.body}}/> */}

          {post.data.content.map((post) => (
            <div className={styles.body} dangerouslySetInnerHTML={{__html: RichText.asHtml(post.body)}}/>

          ))}
          
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
  console.log(response)
  const post = {
    first_publication_date: response.first_publication_date,
    uid: response.uid,
    data: {
      title: response.data.title,
      subtitle: response.data.subtitle,
      banner: response.data.banner,
      author: response.data.author,
      content: 
        // heading: response.data.content.map(reference => {return reference.heading}),
        // // body: response.data.content.map(reference => { return RichText.asHtml(reference.body)})
        // body: response.data.content.map(reference => { return reference.body})
        response.data.content

      
    }
  }




  // TODO

  return {
    props: {post}
  }
};

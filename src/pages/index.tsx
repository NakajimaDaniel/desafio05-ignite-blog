/* eslint-disable prettier/prettier */
import { GetStaticProps } from 'next';

import { getPrismicClient } from '../services/prismic';
import Prismic from '@prismicio/client';
import commonStyles from '../styles/common.module.scss';
import styles from './home.module.scss';

interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface PostPagination {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
}

export default function Home({ posts }: Post) {

  console.log(posts)
  return (
    <div>
      {posts.map(posts=> (
        <h1>{posts.uid}</h1>
      ))}
    </div>

  )

}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();
  

  const postsResponse = await prismic.query([
    Prismic.Predicates.at('document.type', 'posts')
  ], {
    fetch: ['posts.title', 'posts.subtitle', 'posts.author','posts.content'],
    pageSize: 20,
  });

  const posts = postsResponse.results.map(post => {
    return {
      uid: post.uid,

      first_publication_date: new Date(post.first_publication_date).toLocaleDateString('pt-br', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      }),
      data: {
        title: post.data.title,
        subtitle: post.data.subtitle,
        author: post.data.author,
      },
      
    }
  })  


  return {
    props: {posts}
  }
};

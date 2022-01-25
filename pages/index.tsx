import Head from 'next/head'
import {sanityClient, urlFor} from '../sanity';

//Components
import Header from '../components/Header'
import Hero from '../components/Hero';
import PostsComponent from '../components/Posts';

// Definiciones de Typescript
import { Post } from '../typings';
import Posts from '../components/Posts';

interface Props {
  posts: [Post]
}

export default function Home({posts}: Props): JSX.Element {
  // console.log(posts);
  // console.log()
  return (
    <div className="max-w-7xl mx-auto min-w-min">
      <Head>
        <title>David Martinez Web</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <Hero />
      <PostsComponent posts={posts}/>
    </div>
  );
}

//Getserverside props for dinamyc distrubeted rendering
export const getServerSideProps = async () => {
  //fetch info from sanity
  const query = `*[_type == 'post']{
    _id,
    title,
    author-> {
      name,
      image
    },
    description,
    mainImage,
    slug
  }`;

  //manda el fetctch a sanity
  const posts = await sanityClient.fetch(query);
  return{
    props: {
      posts,
    },
  };
};

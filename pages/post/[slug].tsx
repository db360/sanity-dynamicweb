import React from "react";
import { GetStaticProps } from "next";
import { sanityClient, urlFor } from "../../sanity";
import PortableText from 'react-portable-text';

import { Post } from "../../typings";
import Header from "../../components/Header";

interface Props {
  post: Post;
}

function Post({ post }: Props) {
  console.log(post);
  return (
    <main>
      <Header />
      <img className="w-full h-40 object-cover" src={urlFor(post.mainImage).url()!} alt="" />

    <article className="max-w-3xl mx-auto p-5">
        <h1 className="text-3xl mt-10 mb-3">{post.title}</h1>
        <h2 className="text-xl font-light text-gray-500 mb-2">{post.description}</h2>

        <div className="flex items-center space-x-2">
            <img className="h-10 w-10 rounded-full bg-yellow-300" src={urlFor(post.author.image).url()!} alt="" />
            <p className="font-extralight text-sm">
                Blog Post By <span className="text-green-600">{post.author.name}</span> - Published at {new Date(post._createdAt).toLocaleString()}
            </p>
        </div>

        <div>
            <PortableText
                className=""
                dataset={process.env.NEXT_PUBLIC_SANITY_DATASET!}
                projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!}
                content={post.body}
                serializers={
                    {
                        h1: (props:any) => (
                            <h1 className="text-2xl font-bold my-5" {...props} />
                        ),
                        h2: (props: any) => (
                            <h2 className="text-xl font-bold my-5" {...props}/>
                        ),
                        li: ({children}: any) => (
                            <ul>
                                <li className="ml-4 list-disc">{children}</li>
                            </ul>
                        ),
                        link: ({href, children}: any) => (
                            <a href={href} className="text-blue-500 hover:underline">
                                {children}
                            </a>
                        ),
                    }}
                />
        </div>
    </article>
    </main>
  );
}

export default Post;

// Which part prerenders
export const getStaticPaths = async () => {
  // find post
  const query = `*[_type == 'post']{
        _id,
        slug {
            current
        }
      }`;

  const posts = await sanityClient.fetch(query);

  //Provide paths to next.js

  const paths = posts.map((post: Post) => ({
    //   create a list of path that have all the slugs
    params: {
      slug: post.slug.current,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const query = `*[_type == "post" && slug.current == $slug][0] {
        _id,
        _createdAt,
        title,
        author-> {
            name,
            image
        },
        'comments': *[
            _type == "comment" &&
            post._ref == ^.id &&
            approved == true],
        description,
        mainImage,
        slug,
        body
    }`;

  const post = await sanityClient.fetch(query, {
    slug: params?.slug,
  });
  // Si no encuentra post return 404

  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      post,
    },
    //despues de 60 segundos updates el cache
    revalidate: 60,
  };
};
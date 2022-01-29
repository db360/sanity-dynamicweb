import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";
import { urlFor } from "../sanity";
import { Post } from "../typings";

interface Props {
  posts: [Post];
}

const easing = [0.6, -0.05, 0.01, 0.99];

const fadeInUp = {
  initial: {
    x: 60,
    opacity: 0
  },
  animate: {
    y:0,
    opacity: 1,
    transition: {
      duration: .8,
      ease: easing
    }
  }
}

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.3
    }
  }
}

const Posts = ({ posts }: Props) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 p-2 md:p-6">
      {posts.map((post) => (
        <Link key={post._id} href={`/post/${post.slug.current}`}>
          <motion.div variants={stagger} exit={{ opacity: 0 }} className="border rounded-lg group cursor-pointer overflow-hidden">
            {/* Solo renderiza si hay */}
            {post.mainImage && (
              <motion.div variants={fadeInUp}>
                <motion.img
                  initial={{x: 60, opacity:0}}
                  animate={{x:0, opacity:1}}
                  transition={{delay:0.4}}
                  className="h-60 w-full object-cover group-hover:scale-105 transition-transform duration-200 ease-in-out"
                  src={urlFor(post.mainImage).url()! /* que no sea null */}
                  alt=""
                />
                <div className="flex justify-between p-5 bg-white">
                  <div>
                    <p className="text-lg font-bold">{post.title}</p>
                    <p className="text-xs">
                      {post.description} by {post.author.name}
                    </p>
                  </div>
                <img className="h-11 w-13 rounded-full" src={urlFor(post.author.image).url()!} alt=""/>
                </div>
              </motion.div>
            )}
          </motion.div>
        </Link>
      ))}
    </div>
  );
};

export default Posts;

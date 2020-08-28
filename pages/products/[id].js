import React, { useState } from 'react';
import { motion } from 'framer-motion';
import fetch from 'isomorphic-unfetch';
import { BiArrowBack } from 'react-icons/bi';
import Link from 'next/link';

let easing = [0.6, -0.05, 0.01, 0.99];

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const fadeInUp = {
  initial: {
    y: 60,
    opacity: 0,
    transition: { duration: 0.6, ease: easing },
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: easing,
    },
  },
};

const Product = (props) => {
  const [count, setCount] = useState(0);
  const [price, setPrice] = useState(props.product.price);

  const handleIncrement = () => {
    setCount((prevCount) => prevCount + 1);
    setPrice((prevPrice) => prevPrice + price);
  };

  const handleDecrement = () => {
    setCount((prevCount) => prevCount - 1);
    setPrice((prevPrice) => prevPrice - price);
  };

  return (
    <motion.div initial='initial' animate='animate' exit={{ opacity: 0 }}>
      <div className='fullscreen'>
        <div className='product'>
          <motion.div
            className='img'
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
          >
            <motion.img
              key={props.product.image}
              src={props.product.image}
              animate={{ x: 0, opacity: 1 }}
              initial={{ x: 200, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.2 }}
            />
          </motion.div>
          <div className='product-details'>
            <motion.div variants={stagger} className='inner'>
              <Link href='/'>
                <div>
                  <a className='go-back'>
                    <BiArrowBack size={23} />
                  </a>
                </div>
              </Link>
              <motion.div variants={fadeInUp}>
                <span className='category'>Protein</span>
              </motion.div>
              <motion.h1 variants={fadeInUp}>{props.product.name}</motion.h1>
              <motion.p variants={fadeInUp}>{props.product.details}</motion.p>
              <motion.div variants={fadeInUp} className='additonals'>
                <span>{props.product.protein}g Protein</span>
                <span>Gluten Free</span>
              </motion.div>
              <motion.div variants={fadeInUp} className='qty-price'>
                <div className='qty'>
                  <div className='minus' onClick={handleDecrement}>
                    -
                  </div>
                  <div className='amount'>{count}</div>
                  <div className='add' onClick={handleIncrement}>
                    +
                  </div>
                </div>
                <span className='price'>$ {price}</span>
              </motion.div>
              <motion.div variants={fadeInUp} className='btn-row'>
                <button className='add-to-cart'> Add to cart</button>
                <button className='subscribe'> Subscribe</button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

Product.getInitialProps = async function (context) {
  const { id } = context.query;
  const res = await fetch(
    `https://my-json-server.typicode.com/isaqueigor/page-transitions-with-nextjs/products/${id}`
  );
  const product = await res.json();
  return { product };
};

export default Product;

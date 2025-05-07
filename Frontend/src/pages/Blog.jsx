import React, { useState } from 'react';
import Title from '../components/Title';
import { Dialog } from '@headlessui/react';
import { X } from 'lucide-react';

const blogs = [
  {
    id: 1,
    title: 'The Sparkle of Forever',
    description: 'Explore how Forever redefines elegance with every piece of jewelry.',
    image: 'https://www.candere.com/media/image/banners/Rings-2_1.jpg',
    content:
      'Forever’s journey into the world of timeless beauty began with a vision to create jewelry that tells a story. Every piece is a blend of passion, craftsmanship, and a deep appreciation for aesthetics. Discover how each necklace, ring, and bracelet captures the essence of elegance and sophistication.',
  },
  {
    id: 2,
    title: 'Behind the Shine',
    description: 'Meet the artisans and inspirations behind Forever’s collections.',
    image: 'https://www.candere.com/media/mageplaza/blog/post/Jewellery-trends-Banner1_1_.jpg',
    content:
      'Our artisans blend traditional techniques with modern design to bring each piece to life. From the first sketch to the final polish, every detail is handled with care and precision. Learn about the heritage and creativity that power Forever’s unique designs.',
  },
  {
    id: 3,
    title: 'Jewelry Care Tips',
    description: 'Keep your treasures shining for years with our expert care tips.',
    image: 'https://www.candere.com/media/mageplaza/blog/post/5-Genius-hacks.jpg',
    content:
      'Preserving the sparkle of your jewelry is easier than you think. Discover our top care tips to maintain the brilliance and quality of your favorite Forever pieces—from cleaning routines to storage hacks.',
  },
  {
    id: 4,
    title: 'The Bridal Edit',
    description: 'Celebrate your love story with Forever’s curated bridal collection.',
    image:' https://www.candere.com/media/mageplaza/blog/post/Fashion-Forecast.jpg',
    content:
      'Our bridal collection is crafted to celebrate love, elegance, and timeless beauty. Whether you’re walking down the aisle or choosing a gift for your special someone, explore pieces designed to capture hearts forever.',
  },
];

const Blog = () => {
  const [openBlog, setOpenBlog] = useState(null);

  return (
    <div className='min-h-screen bg-white px-4 sm:px-10 md:px-20 pt-10 pb-20'>
      <div className='text-center mb-8'>
        <Title text1='JEWELRY' text2='BLOGS' />
        <p className='text-gray-600 max-w-2xl mx-auto text-sm sm:text-base mt-2'>
          Dive into the world of shine, stories, and sophistication with Forever’s exclusive blog collection.
        </p>
      </div>

      <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className='border rounded-2xl shadow-sm overflow-hidden transition hover:shadow-xl duration-300'
          >
            <img
              src={`${blog.image}?auto=format&fit=crop&w=800&q=80`}
              alt={blog.title}
              className='h-48 w-full object-cover transition-transform duration-300 hover:scale-105'
            />
            <div className='p-4 flex flex-col gap-2'>
              <h3 className='text-xl font-semibold text-gray-800'>{blog.title}</h3>
              <p className='text-gray-600 text-sm'>{blog.description}</p>
              <button
                onClick={() => setOpenBlog(blog)}
                className='mt-2 w-max text-sm font-medium text-blue-600 hover:underline'
              >
                Read More →
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Blog Modal */}
      <Dialog open={!!openBlog} onClose={() => setOpenBlog(null)} className='relative z-50'>
        <div className='fixed inset-0 bg-black/30' aria-hidden='true' />
        <div className='fixed inset-0 flex items-center justify-center p-4'>
          <Dialog.Panel className='bg-white max-w-xl w-full p-6 rounded-xl shadow-xl relative animate-fade-in'>
            <button
              onClick={() => setOpenBlog(null)}
              className='absolute top-3 right-3 text-gray-500 hover:text-red-500'
            >
              <X size={20} />
            </button>
            {openBlog && (
              <>
                <img
                  src={`${openBlog.image}?auto=format&fit=crop&w=800&q=80`}
                  alt={openBlog.title}
                  className='w-full h-56 object-cover rounded-md mb-4'
                />
                <Dialog.Title className='text-2xl font-bold mb-2'>{openBlog.title}</Dialog.Title>
                <Dialog.Description className='text-sm text-gray-600 mb-4'>
                  {openBlog.description}
                </Dialog.Description>
                <p className='text-gray-700 text-sm'>{openBlog.content}</p>
              </>
            )}
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
};

export default Blog;

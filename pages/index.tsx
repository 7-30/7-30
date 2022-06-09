import { useEffect, useRef, useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';

const Home: NextPage = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number>();

  useEffect(() => {
    setInterval(() => {
      const comma = document.getElementById('comma') as HTMLElement;
      comma.style.opacity = comma.style.opacity === '0' ? '1' : '0';
    }, 1000);
  }, []);

  useEffect(() => {
    if (ref.current?.offsetHeight) {
      setHeight(ref.current?.offsetHeight);
    }
  }, [ref]);

  return (
    <>
      <Head>
        <title>7-30</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <div className='h-screen w-full bg-hero bg-cover bg-center bg-no-repeat px-6'>
        <nav ref={ref} className='container mx-auto flex justify-between py-4'>
          <h2 className='text-white'>
            7<span id='comma'>:</span>30
          </h2>
        </nav>

        <main
          className='container mx-auto flex flex-col justify-center sm:flex-row sm:items-center sm:justify-start'
          style={height ? { height: `calc(100% - ${height}px)` } : {}}
        >
          <div className='flex w-full flex-col gap-y-4 sm:w-2/3'>
            <span className='font-semibold uppercase tracking-widest text-gray-300'>Organizația 7:30</span>
            <h1 className='leading-snug text-white'>
              Este despre a așeza mai multe piese care împreună mișcă un sistem.
            </h1>
            <span className='italic text-white'>Lucruri magice se vor întâmpla, stai cu gândul aproape. 💭</span>
          </div>
        </main>
      </div>
    </>
  );
};

export default Home;

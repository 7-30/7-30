import { useEffect, useRef, useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';

const Home: NextPage = () => {
  const ref = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLSpanElement>(null);

  const [height, setHeight] = useState<number>();
  const [response, setResponse] = useState<string>('');
  const [isSending, setIsSending] = useState<boolean>(false);
  const [sent, setSent] = useState<boolean>(false);

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

  useEffect(() => {
    if (sent && buttonRef) {
      if (buttonRef.current?.innerHTML) {
        buttonRef.current.innerHTML = '👌🏼';

        setTimeout(() => {
          if (buttonRef.current?.innerHTML) {
            buttonRef.current.innerHTML = '&gt;';
          }

          setIsSending(false);
          setResponse('');
        }, 2000);
      }
    }
  }, [sent, buttonRef]);

  const handleButton = async () => {
    setIsSending(true);
    const req = await fetch('/api/sendMail', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({ response })
    }).then((r) => r.json());

    if (req.success) {
      setSent(true);
    }
  };

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

            <div className='mt-16 flex w-full flex-col items-start gap-y-2 rounded-md bg-opacity-50 sm:mt-16 lg:w-1/2'>
              <p className='text-white'>(încă) nu știm să traducem, dar am vrea.</p>
              <p className='font-semibold uppercase tracking-widest text-gray-300'>
                <span className='shake'>disruptive</span> education means = ?
              </p>
              <div className='relative w-full'>
                <input
                  value={response}
                  onChange={({ target }) => setResponse(target.value)}
                  className='w-full rounded-md border bg-transparent p-2 pr-10 text-lg text-white outline-none'
                  placeholder='Apăi aia și aia...'
                />
                <button
                  style={{ height: 46 }}
                  onClick={handleButton}
                  disabled={isSending || !response}
                  className='absolute top-0 right-0 w-10 rounded-tr-md rounded-br-md border-b border-r border-t bg-green-700 p-2.5 uppercase text-white disabled:bg-opacity-60'
                >
                  <span ref={buttonRef}>&gt;</span>
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Home;

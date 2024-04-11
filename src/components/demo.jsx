import { useState, useEffect } from "react";
import axios from 'axios';

function Demo() {
  const [img, setImg] = useState({
    url: '',
    prompt: ''
  });
  const [allImg, setAllImg] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const articleFromLocalStorage = JSON.parse(localStorage.getItem('img'));
    if (articleFromLocalStorage) {
      setAllImg(articleFromLocalStorage);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const { data } = await axios.post('https://server-flask-lyu2.onrender.com/process_image', { input: img.prompt });
      if (data?.url) {
        const newImg = { ...img, url: data.url };
        const updatedAllImg = [newImg, ...allImg];
        setImg(newImg);
        setAllImg(updatedAllImg);
        localStorage.setItem('img', JSON.stringify(updatedAllImg));
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Error processing image:', error);
    }
  }

  const shareViaWhatsApp = () => {
    // Construct the WhatsApp message
    const message = `Check out this image prompt: ${img.prompt} ${img.url}`;
    // Open WhatsApp with the pre-filled message
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`);
  }

  const copyPromptText = () => {
    // Copy the prompt text to clipboard
    alert(`Copied: ${img.prompt} <br> ${img.url}`);
    navigator.clipboard.writeText(img.url, );
  }

  return (
    <section className="mt-16 w-full max-w-xl">
      <div className="flex flex-col w-full gap-4">
        <form className="flex items-center" onSubmit={handleSubmit}>
          <input
            type="text"
            className="border border-gray-300 rounded-lg py-2 px-4 w-full md:w-96"
            placeholder="Enter an image prompt..."
            value={img.prompt}
            onChange={(e) => { setImg({ ...img, prompt: e.target.value }) }}
            required
          />
          <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg ml-4">Submit</button>
        </form>

        {/* Browse URL History */}
        <div className="overflow-y-auto border border-gray-300 rounded-lg">
          {allImg.map((prompt, index) => (
            <div key={`link-${index}`} onClick={() => setImg(prompt)} className="flex items-center p-4 hover:bg-gray-100 cursor-pointer">
              <img src='https://res.cloudinary.com/dqhyudo4x/image/upload/v1693680692/ai/copy_s2nulg.svg' alt="" className="w-8 h-8 mr-4" />
              <p className="truncate">{prompt.prompt}</p>
            </div>
          ))}
        </div>
      </div>

      <div className='my-10 max-w-full flex justify-center'>
        {
        isLoading? ( <img src='https://res.cloudinary.com/dqhyudo4x/image/upload/v1693680693/ai/loader_coruoi.svg' alt='loader' className='w-20 h-20 object-contain' />)
        :
        (img.url && (
          <div className='flex flex-col items-center'>
            <h2 className='font-bold text-gray-600 text-xl mb-4'>
              Image Prompt:
              <span className='text-blue-500 ml-2'>{img.prompt}</span>
            </h2>
            <div className='max-w-xl'>
            <div className="mt-4 flex items-center gap-4">
              <div className="flex items-center justify-between w-full border-red-400 border-spacing-7">
              
                <img src="https://res.cloudinary.com/dqhyudo4x/image/upload/v1694982337/lvkyjym88gvkad9kvtcx.jpg"
                      alt=""
                      className="w-[10%] h-[10%] "
                      onClick={shareViaWhatsApp}
                      />
              
              <img src="https://res.cloudinary.com/dqhyudo4x/image/upload/v1693680692/ai/copy_s2nulg.svg"
                      alt=""
                      className="w-[10%] h-[10%] object-contain" 
                      onClick={copyPromptText}
                      />
             
              </div>
            </div>
              <img src={img.url} alt={img.prompt} className='w-full rounded-lg shadow-lg' />
            </div>
           
          </div>
        ))}
      </div>
    </section>
  )
}

export default Demo;



function Hero() {
  return (
    <header className="w-full flex justify-center items-center flex-col">
        <nav className="flex justify-between items-center flex-row w-full p-4 pb-16">
        <img src="https://res.cloudinary.com/dqhyudo4x/image/upload/v1709658709/loading_o3j8ux.gif" alt="logo" className="w- object-contain w-20 h-20 rounded-full"/>

        <button type="button" onClick={()=> window.open('https://github.com/Pranjal-sharma-SDE')} className="black_btn" >Git Hub</button>
          
        </nav>
        <h1 className="head_text"> Generate Image with Text2Pic <br className="max-md:hidden"/> 
        <span className="orange_gradient"> Text To Image</span>
        </h1>
        <h2 className="desc">
            Glorify your Imagination with <span className="orange_gradient">AI.</span>
        </h2>
         </header>
  )
}

export default Hero

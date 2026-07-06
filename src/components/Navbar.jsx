function Navbar(){

    return(

<header>

<div className="container navbar">

<div className="logo">
LearnMint
</div>

<nav>

<a href="#">Home</a>

<a href="#">Explore</a>

<a href="#">Categories</a>

<a href="#">Creators</a>
<a href="#">Community</a>

<a href="#">Pricing</a>

</nav>
 
    <div className="search-box">
          <span className="search-icon">⌕</span>
          <input
            type="text"
            placeholder="Search resources, creators..."
          />
          
    </div>


<div className="buttons">

<button className="login">

Login

</button>

<button className="signup">

Sign Up

</button>

</div>

</div>

</header>

    )

}

export default Navbar;
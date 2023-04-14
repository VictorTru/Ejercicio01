const imageProfile = document.querySelector("#img-profile")
const githubName = document.querySelector("#github-name")
const githubUsername = document.querySelector("#github-username")
const githubJoined = document.querySelector("#github-joined")
const githubRepos = document.querySelector("#github-repos")
const githubFollowers = document.querySelector("#github-followers")
const githubFollowing = document.querySelector("#github-following")
const githubBio = document.querySelector("#github-bio");
const githubCompany = document.querySelector("#github-company");
const githubBlog = document.querySelector("#github-blog");


//action

const githubActionSearch = document.querySelector("#github-action-search")
const githubInputSearch = document.querySelector("#github-search")


//evento onclick del bton

githubActionSearch.onclick=()=>{
    const username = githubInputSearch.value;

    githubInputSearch.value="";
    if(username === ""){
        Swal.fire({
            title:"Error",
            text:"Debes llenar el usuario",
            icon:"error"
        });
        return;
    }
    obtenerDatosGithub(username)
}




//vamos detectar el evento de enter cuano este en el input(este es otro evento - keyup)

githubInputSearch.addEventListener("keyup",function(event){
    if(event.key=="Enter"){
        obtenerDatosGithub(event.target.value)
    }

});

//es la funcion fecth que consume el Api


const obtenerDatosGithub = async (username="VictorTru") => {
  // ene ste ejemplio await esta haciendo lo sgte
  const response = await fetch(`https://api.github.com/users/${username}`);
  const data = await response.json();
 //data mesaage de error cuando el usario no existe 
 //su valor sea not found 
  if(data.message === "Not Found"){
    Swal.fire({
        title:"Error",
        text:"No existe el usuario",
        icon:"error"
    })
  }


  setDataUser(data)
};



//es una funcion que alamacena los datos a cambiar 

const setDataUser =(data)=>{
    imageProfile.src= data.avatar_url;
    githubName.innerHTML =data.name;
    githubUsername.innerHTML=`@${data.login}`;
    githubFollowers.innerHTML=data.followers;
    githubFollowing.innerHTML=data.following;
    githubRepos.innerHTML = data.repos_url.length;
    githubBio.innerHTML= data.bio;
    githubBlog.innerHTML=data.blog;
    githubCompany.innerHTML = data.company;
}

obtenerDatosGithub();




type PostType = {
    userId: number,
    id: number,
    title: string,
    body: string
}

type UserType = {
    id: number,
    name: string,
    username: string,
    email: string,
    address: {
        street: string,
        suite: string,
        city: string,
        zipcode: string,
        geo: {
            lat: number,
            lng: number
        }
    },
    phone: string,
    website: string,
    company: {
        name: string,
        catchPhrase: string,
        bs: string
    }
}

type PostAndUserType = UserType & {posts: PostType[]};

const fetchPosts = async () : Promise<PostType[]> => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data = await res.json();
  return data;
}

const fetchUsers = async () : Promise<UserType[]> => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await res.json();
  return data;
}

const mergeUserAndPosts = async () : Promise<PostAndUserType[]> => {
    const posts = await fetchPosts();
    const users = await fetchUsers();
    const usersAndPosts = users.map(user => {
        const postsOfUser = posts.filter(post => post.userId === user.id);
        return {...user, posts:postsOfUser};
    });
    return usersAndPosts;
        
}

 

const afficherPostsEtUsers = async (e ?: Event) => {
    
    const poste_titre = (document.getElementById("search_titre") as HTMLInputElement).value ?? "";
    const auteur = (document.getElementById("search_auteur") as HTMLInputElement).value ?? "";

    

    if(e){
        e.preventDefault();
    }
    


    const articles = document.getElementById("articles");
    articles.innerHTML = "";
    console.log(auteur);
    const postsAndUsers = await mergeUserAndPosts();

    postsAndUsers.filter(postAndUser =>postAndUser.name.toLowerCase().includes(auteur.toLowerCase())).filter(postAndUser =>postAndUser.posts.filter(post => post.title.toLowerCase().includes(poste_titre.toLowerCase())).length > 0).forEach(postAndUser => {
        const article = document.createElement("article");
        article.innerHTML = `
        <div class="bg-white rounded-lg shadow-lg p-4 hover:shadow-md transition duration-300">
            <h2 class="text-xl font-bold">${postAndUser.name}</h2>
            <p class="text-gray-600">${postAndUser.email}</p>
            <h3 class="text-lg font-bold mt-4">Titre des articles rédigés:</h3>
            <ul class="list-disc pl-6 mt-2">
                ${
                    postAndUser.posts.filter((post, index) => index < 10).map(post => { 
                        return `<li>${post.title}</li>`
                    }).join("")
                }
            </ul>
        </div>
        `;
        articles.appendChild(article);
    })
    console.log(postsAndUsers);
         
}

afficherPostsEtUsers();


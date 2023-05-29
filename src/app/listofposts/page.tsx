import Image from "next/image"

const getPostsData  = async () => {
const res = await fetch("https://jsonplaceholder.typicode.com/posts")
return res.json();
}

const getUsersData = async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/users")
    return res.json();
}
// this one not static
const getDogData= async () => {
    const res = await fetch("https://dog.ceo/api/breeds/image/random",{
    next:{
        revalidate: 3,
    }
    });
    return res.json();
}

export default async function ListOfPosts () {
    const [posts,users,dog] = await Promise.all([getPostsData(),getUsersData(), getDogData()]);
  
    return(
    
    <>
    <div>
        <Image src={dog.message}  alt="dog" width={300}height={300}/>

        {posts.map((post:any) =>{
            return <p key={post.id}>{post.title}</p>
        })}

    </div>
    <div>
        {users.map((user:any) =>{
            return <p key={user.id}>{user.name}</p>
        })}
    </div>
    </>
    )
 }

let globalPostForSort;


// this function is for loading categories
const loadCategories  = async () =>{
    const url = `https://openapi.programming-hero.com/api/videos/categories`;
    const res = await fetch(url);
    const data = await res.json();
    const categories = data.data;
    categoriesBtn(categories);
}
loadCategories();

// this function is A PART OF display data of a particular category in the UI
const displayData = (posts,bool) =>{
      
    const displayDataContainer = document.getElementById('display-data-container');
    displayDataContainer.innerHTML = '';

    // if no data avaible then it will show this in the UI
    if(posts.length === 0){
        displayDataContainer.innerHTML = `
            <div class="flex flex-col justify-center items-center space-y-8 w-screen h-96">
                <img src="../images/Icon.png">
                <h2 class="font-bold text-3xl text-center">Oops!! Sorry, There is no <br> content here</h2>
            </div>`
    }

    // sort descending order based on views
    let sortedPost;
    if(bool){
        sortedPost = posts.toSorted((a,b) => parseInt(b.others.views) - parseInt(a.others.views));
        display(sortedPost);      
    }
    else{
        display(posts);
    }
    
}

// this function IS AONTHER part  for display in the UI
function display(posts){
    const displayDataContainer = document.getElementById('display-data-container');
    posts.forEach(post =>{
        
        const postContainer = document.createElement('div');
        postContainer.classList = 'card bg-base-100 shadow-xl rounded';
        postContainer.innerHTML = `
                <figure class="relative">
                    <img src="${post.thumbnail}" class="w-full h-48"/>
                    <div class="absolute bottom-0 right-3">
                        <span class="text-white bg-black bg-opacity-60 rounded">${post.others.posted_date? timeConversion(post.others.posted_date):''}
                    </div>
                </figure>
                <div class="card-body">
                    <div class="flex gap-3">
                        <img src="${post.authors[0].profile_picture}" class="w-10 h-10 rounded-full"/>
                        <div>
                            <h3 class="font-bold">${post.title}</h3>
                            <p class="flex gap-2 items-center">${post.authors[0].profile_name} ${post.authors[0].verified ? "<img src='../images/verify.png' class='w-4 h-4'>" : ''}
                            </p>
                            <p>${post.others.views}</p>
                        </div>
                        
                    </div>
                    
                </div>        
        `
        displayDataContainer.appendChild(postContainer);
    })
}

// this function is for loading specefic category data
const loadData = async (id) =>{
    const url = `https://openapi.programming-hero.com/api/videos/category/${id}`
    const res = await fetch(url);
    const data = await res.json();
    const posts = data.data;
    globalPostForSort = posts;
    displayData(posts,false);
}

// default loading
loadData('1000');

// this function is for showing categories button
const categoriesBtn = (categories) =>{
    const categoryBtncontainer = document.getElementById('category-btn-container');
    categories.forEach(cat => {
        const btn = document.createElement('button');
        btn.classList = 'btn';
        btn.innerText = cat.category;
        categoryBtncontainer.appendChild(btn);
        btn.onclick = function(){
            loadData(cat.category_id);
        }
    });
}



// this is sort by view button
document.getElementById('sort-btn').addEventListener('click',function(){  
    displayData(globalPostForSort,true);
})


// this is for time conversion in hours and min
function timeConversion(inSeconds){
    const totalMin = Math.floor(inSeconds/60);
    const hour = Math.floor(totalMin/60);
    const min = totalMin % 60;
    console.log('ok');
    return `${hour}hrs ${min} min ago`;
}

// this is for blog page
document.getElementById('blog-btn').addEventListener('click',function(){
    window.location.href = 'blog.html';
})
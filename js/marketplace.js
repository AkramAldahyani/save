document.addEventListener('DOMContentLoaded',()=>{
  const user = JSON.parse(localStorage.getItem('user'));
  const items = [
    { id:1, title:"Eco Tote Bag",     desc:"Reusable cotton tote.",   price:1.200, img:"images/Eco Tote Bag.jpg" },
    { id:2, title:"Stainless Straw",   desc:"Metal straw w/ cleaner.", price:0.750, img:"images/Stainless Straw.jpg" },
    { id:3, title:"Bamboo Toothbrush", desc:"Biodegradable brush.",     price:0.500, img:"images/Bamboo Toothbrush.jpg" },
    { id:4, title:"Glass Jar Set",     desc:"Storage jars (4-pack).",   price:3.000, img:"images/Glass Jar Set.webp" },
    { id:5, title:"Beeswax Wraps",     desc:"Eco-friendly wraps.",      price:2.500, img:"images/Beeswax Wraps.jpg" },
    { id:6, title:"Solar Lamp",        desc:"Portable solar lamp.",     price:5.000, img:"images/Solar Lamp.jpg" },
    { id:7, title:"Recycled Notebook", desc:"Paper from waste paper.",  price:1.800, img:"images/Recycled Notebook.webp" },
    { id:8, title:"Plantable Pencil",  desc:"Grows into herb after use.",price:0.900,img:"images/Plantable Pencil.jpg" },
    { id:9, title:"Cork Coasters",     desc:"Set of 4 cork coasters.",  price:2.200, img:"images/Cork Coasters.png" },
    { id:10,title:"Jute Rug",          desc:"Handmade jute rug.",       price:12.000,img:"images/Jute Rug.webp" }
  ];
  const shop = document.getElementById('shop-items');
  items.forEach(i=>{
    const card=document.createElement('div'); card.className='listing-card';
    card.innerHTML=`
      <img src="${i.img}" alt="${i.title}">
      <h4>${i.title}</h4>
      <p>${i.desc}</p>
      <p><strong>${i.price.toFixed(3)} BHD</strong></p>
      <button data-id="${i.id}" class="btn btn-primary">Add to Cart</button>
    `;
    shop.appendChild(card);
  });
  shop.addEventListener('click',e=>{
    if(e.target.tagName==='BUTTON'){
      if (!user) {
        alert('Please sign up or log in to add items to cart.');
        return;
      }
      const id=+e.target.dataset.id;
      const cart=JSON.parse(localStorage.getItem('cart'))||[];
      cart.push(items.find(x=>x.id===id));
      localStorage.setItem('cart',JSON.stringify(cart));
      document.getElementById('cart-count').textContent = cart.length;
      e.target.textContent='Added'; e.target.disabled=true;
    }
  });

  // User listing form
  const form = document.getElementById('listing-form');
  const listContainer = document.getElementById('user-listings');
  form.addEventListener('submit',e=>{
    e.preventDefault();
    if (!user) {
      alert('Please sign up or log in to list items.');
      return;
    }
    const title = form.title.value.trim();
    const desc  = form.desc.value.trim();
    const price = parseFloat(form.price.value).toFixed(3);
    if(title && desc && !isNaN(price)){
      const li=document.createElement('div'); li.className='listing-card';
      li.innerHTML=`
        <img src="assets/placeholder.png" alt="${title}">
        <h4>${title}</h4>
        <p>${desc}</p>
        <p><strong>${price} BHD</strong></p>
      `;
      listContainer.appendChild(li);
      let pts = parseInt(localStorage.getItem('points'))||0; pts +=10;
      localStorage.setItem('points', pts);
      document.getElementById('user-points').textContent = pts;
      form.reset();
    }
  });
});
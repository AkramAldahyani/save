document.addEventListener('DOMContentLoaded',()=>{
    const cart = JSON.parse(localStorage.getItem('cart'))||[];
    const list = document.getElementById('cart-list');
    let total = 0;
    cart.forEach((item,i)=>{
      total += item.price;
      const li=document.createElement('li');
      li.className='cart-item';
      li.innerHTML=`
        <img src="${item.img||'assets/placeholder.png'}" alt="${item.title}">
        <div class="cart-item-details">
          <span>${item.title}</span>
          <span>${item.price.toFixed(3)} BHD</span>
          <button data-i="${i}" class="btn-remove">Remove</button>
        </div>
      `;
      list.appendChild(li);
    });
    document.getElementById('cart-total').textContent = `${total.toFixed(3)} BHD`;
    list.addEventListener('click',e=>{
      if(e.target.classList.contains('btn-remove')){
        const idx=+e.target.dataset.i;
        cart.splice(idx,1);
        localStorage.setItem('cart',JSON.stringify(cart));
        location.reload();
      }
    });
    document.getElementById('checkout-form').addEventListener('submit',e=>{
      e.preventDefault();
      alert('Payment processed! Thank you.');
      localStorage.removeItem('cart');
      location.href='index.html';
    });
  });  
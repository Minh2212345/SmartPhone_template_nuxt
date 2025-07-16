<template>
  <nav class="navbar" style="display: flex; align-items: center; justify-content: space-between;">
   <div>
        <NuxtLink to="/">
          <img src="/assets/images/demos/demo-4/logo.png" alt="Logo" class="h-40" />
        </NuxtLink>
      </div>
      
    <div class="nav-links" style="display: flex; gap: 20px;">      
      <NuxtLink class="fontTypeText" to="/">Trang chủ</NuxtLink>
      <NuxtLink class="fontTypeText" to="/category-4cols">Sản phẩm</NuxtLink>      
      <NuxtLink class="fontTypeText" to="/compare-page">So sánh</NuxtLink>
      <NuxtLink class="fontTypeText" to="/order-page">Đơn hàng</NuxtLink>
      <a href="#" class="fontTypeText">Hỗ trợ</a>
    </div>
    <div class="nav-actions" style="display: flex; gap: 10px;">  
      <NuxtLink class="fontType" to="/login-page#signin">
        <i class="las la-sign-in-alt" style="color: white"></i>
        Đăng nhập</NuxtLink>                  
      <div style="background: linear-gradient(335deg, #28a745, #08387B); color: white; padding: 5px 10px; border-radius: 5px; position: relative;">        
        <NuxtLink class="fontType" to="/cart-page">
          <i class="icon-shopping-cart" style="color: white"></i>
          Giỏ hàng <span style="position: absolute; top: -5px; right: -5px; background-color: red; color: white; border-radius: 50%; width: 15px; height: 15px; display: flex; align-items: center; justify-content: center;">2</span></NuxtLink>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.navbar{
  background: #162d63;
}

.fontType{
background: linear-gradient(335deg, #28a745, #08387B); color: white; border: none; padding: 5px 10px; border-radius: 5px;
}

.fontTypeText{
  color: white; border: none; padding: 5px 10px; border-radius: 5px;
}
</style>
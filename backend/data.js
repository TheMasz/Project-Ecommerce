import bcrypt from "bcryptjs";
const data = {
  users: [
    {
      name: "Masz",
      email: "admin@example.com",
      password: bcrypt.hashSync("1234", 8),
      isAdmin: true,
    },
    {
      name: "Poly",
      email: "user@example.com",
      password: bcrypt.hashSync("1234", 8),
      isAdmin: false,
    },
  ],
  products: [
    {
      name: "Nike Slim Shirt",
      category: "Shirts",
      images: [
        {
          url: "/assets/images/p1.jpg",
        },
        {
          url: "/assets/images/p1.jpg",
        },
        {
          url: "/assets/images/p1.jpg",
        },
      ],
      price: 120,
      countInStock: 0,
      brand: "Nike",
      showList: "HotSell",
      description: `Contrary to popular belief, Lorem Ipsum is not simply random 
        text. It has roots in a piece of classical Latin literature from 45 
        BC, making it over 2000 years old. Richard McClintock, a Latin 
        professor at Hampden-Sydney College in Virginia, looked up one 
        of the more obscure Latin words, consectetur, from a Lorem 
        Ipsum passage, and going through the cites of the word in 
        classical literature, discovered the undoubtable source. Lorem 
        Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus 
        Bonorum et Malorum"
        `,
    },
    {
      name: "Adidas Fit Shirt",
      category: "Shirts",
      images: [
        {
          url: "/assets/images/p2.jpg",
        },
        {
          url: "/assets/images/p2.jpg",
        },
        {
          url: "/assets/images/p2.jpg",
        },
      ],
      price: 100,
      countInStock: 20,
      brand: "Adidas",
      showList: "HotSell",
      description: `Contrary to popular belief, Lorem Ipsum is not simply random 
        text. It has roots in a piece of classical Latin literature from 45 
        BC, making it over 2000 years old. Richard McClintock, a Latin 
        professor at Hampden-Sydney College in Virginia, looked up one 
        of the more obscure Latin words, consectetur, from a Lorem 
        Ipsum passage, and going through the cites of the word in 
        classical literature, discovered the undoubtable source. Lorem 
        Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus 
        Bonorum et Malorum"
        `,
    },
    {
      name: "Lacoste Free Shirt",
      category: "Shirts",
      images: [
        {
          url: "/assets/images/p3.jpg",
        },
        {
          url: "/assets/images/p3.jpg",
        },
        {
          url: "/assets/images/p3.jpg",
        },
      ],
      price: 220,
      countInStock: 0,
      brand: "Lacoste",
      showList: "HotSell",
      description: `Contrary to popular belief, Lorem Ipsum is not simply random 
        text. It has roots in a piece of classical Latin literature from 45 
        BC, making it over 2000 years old. Richard McClintock, a Latin 
        professor at Hampden-Sydney College in Virginia, looked up one 
        of the more obscure Latin words, consectetur, from a Lorem 
        Ipsum passage, and going through the cites of the word in 
        classical literature, discovered the undoubtable source. Lorem 
        Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus 
        Bonorum et Malorum"
        `,
    },
    {
      name: "Nike Slim Pant",
      category: "Pants",
      images: [
        {
          url: "/assets/images/p4.jpg",
        },
        {
          url: "/assets/images/p4.jpg",
        },
        {
          url: "/assets/images/p4.jpg",
        },
      ],
      price: 78,
      countInStock: 15,
      brand: "Nike",
      showList: "InNew",
      description: `Contrary to popular belief, Lorem Ipsum is not simply random 
        text. It has roots in a piece of classical Latin literature from 45 
        BC, making it over 2000 years old. Richard McClintock, a Latin 
        professor at Hampden-Sydney College in Virginia, looked up one 
        of the more obscure Latin words, consectetur, from a Lorem 
        Ipsum passage, and going through the cites of the word in 
        classical literature, discovered the undoubtable source. Lorem 
        Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus 
        Bonorum et Malorum"
        `,
    },
    {
      name: "Puma Slim Pant",
      category: "Pants",
      images: [
        {
          url: "/assets/images/p5.jpg",
        },
        {
          url: "/assets/images/p5.jpg",
        },
        {
          url: "/assets/images/p5.jpg",
        },
      ],
      price: 65,
      countInStock: 5,
      brand: "Puma",
      showList: "InNew",
      description: `Contrary to popular belief, Lorem Ipsum is not simply random 
        text. It has roots in a piece of classical Latin literature from 45 
        BC, making it over 2000 years old. Richard McClintock, a Latin 
        professor at Hampden-Sydney College in Virginia, looked up one 
        of the more obscure Latin words, consectetur, from a Lorem 
        Ipsum passage, and going through the cites of the word in 
        classical literature, discovered the undoubtable source. Lorem 
        Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus 
        Bonorum et Malorum"
        `,
    },
    {
      name: "Adidas Fit Pant",
      category: "Pants",
      images: [
        {
          url: "/assets/images/p6.jpg",
        },
        {
          url: "/assets/images/p6.jpg",
        },
        {
          url: "/assets/images/p6.jpg",
        },
      ],
      price: 139,
      countInStock: 12,
      brand: "Adidas",
      showList: "InNew",
      description: `Contrary to popular belief, Lorem Ipsum is not simply random 
        text. It has roots in a piece of classical Latin literature from 45 
        BC, making it over 2000 years old. Richard McClintock, a Latin 
        professor at Hampden-Sydney College in Virginia, looked up one 
        of the more obscure Latin words, consectetur, from a Lorem 
        Ipsum passage, and going through the cites of the word in 
        classical literature, discovered the undoubtable source. Lorem 
        Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus 
        Bonorum et Malorum"
        `,
    },
    {
      name: "Adidas Fit Pant",
      category: "Pants",
      images: [
        {
          url: "/assets/images/p1.jpg",
        },
        {
          url: "/assets/images/p1.jpg",
        },
        {
          url: "/assets/images/p1.jpg",
        },
      ],
      price: 139,
      countInStock: 12,
      brand: "Adidas",
      showList: "HotSell",
      description: `Contrary to popular belief, Lorem Ipsum is not simply random 
        text. It has roots in a piece of classical Latin literature from 45 
        BC, making it over 2000 years old. Richard McClintock, a Latin 
        professor at Hampden-Sydney College in Virginia, looked up one 
        of the more obscure Latin words, consectetur, from a Lorem 
        Ipsum passage, and going through the cites of the word in 
        classical literature, discovered the undoubtable source. Lorem 
        Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus 
        Bonorum et Malorum"
        `,
    },
    {
      name: "Adidas Fit Pant",
      category: "Pants",
      images: [
        {
          url: "/assets/images/p2.jpg",
        },
        {
          url: "/assets/images/p2.jpg",
        },
        {
          url: "/assets/images/p2.jpg",
        },
      ],
      price: 139,
      countInStock: 12,
      brand: "Adidas",
      showList: "HotSell",
      description: `Contrary to popular belief, Lorem Ipsum is not simply random 
        text. It has roots in a piece of classical Latin literature from 45 
        BC, making it over 2000 years old. Richard McClintock, a Latin 
        professor at Hampden-Sydney College in Virginia, looked up one 
        of the more obscure Latin words, consectetur, from a Lorem 
        Ipsum passage, and going through the cites of the word in 
        classical literature, discovered the undoubtable source. Lorem 
        Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus 
        Bonorum et Malorum"
        `,
    },
    {
      name: "Adidas Fit Pant",
      category: "Pants",
      images: [
        {
          url: "/assets/images/p3.jpg",
        },
        {
          url: "/assets/images/p3.jpg",
        },
        {
          url: "/assets/images/p3.jpg",
        },
      ],
      price: 139,
      countInStock: 12,
      brand: "Adidas",
      showList: "InNew",
      description: `Contrary to popular belief, Lorem Ipsum is not simply random 
        text. It has roots in a piece of classical Latin literature from 45 
        BC, making it over 2000 years old. Richard McClintock, a Latin 
        professor at Hampden-Sydney College in Virginia, looked up one 
        of the more obscure Latin words, consectetur, from a Lorem 
        Ipsum passage, and going through the cites of the word in 
        classical literature, discovered the undoubtable source. Lorem 
        Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus 
        Bonorum et Malorum"
        `,
    },
    {
      name: "Adidas Fit Pant",
      category: "Pants",
      images: [
        {
          url: "/assets/images/p4.jpg",
        },
        {
          url: "/assets/images/p4.jpg",
        },
        {
          url: "/assets/images/p4.jpg",
        },
      ],
      price: 139,
      countInStock: 12,
      brand: "Adidas",
      showList: "InNew",
      description: `Contrary to popular belief, Lorem Ipsum is not simply random 
        text. It has roots in a piece of classical Latin literature from 45 
        BC, making it over 2000 years old. Richard McClintock, a Latin 
        professor at Hampden-Sydney College in Virginia, looked up one 
        of the more obscure Latin words, consectetur, from a Lorem 
        Ipsum passage, and going through the cites of the word in 
        classical literature, discovered the undoubtable source. Lorem 
        Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus 
        Bonorum et Malorum"
        `,
    },
  ],
  categories: [
    {
      name: 'เสื้อผ้าแฟชั่นผู้ชาย',
      icon: 'ManFashion.png'
    },
    {
      name: 'มือถือและอุปกรณ์เสริม',
      icon: 'Mobile.png'
    },
    {
      name: 'อาหารเสริมและผลิตภัณฑ์สุขภาพ',
      icon: 'Heathy.png'
    },
    {
      name: 'นาฬิกาและแว่นตา',
      icon: 'Watches&Glasses.png'
    },
    {
      name: 'รองเท้าผู้ชาย',
      icon: 'ManShue.png'
    },
    {
      name: 'คอมพิวเตอร์และแล็ปท็อป',
      icon: 'Com&Laptop.png'
    },
    {
      name: 'กล้องและอุปกรณ์ถ่ายภาพ',
      icon: 'Camera.png'
    },
    {
      name: 'กีฬาและกิจกรรมกลางแจ้ง',
      icon: 'Activity.png'
    },
    {
      name: 'เกมและฮ๊อบบี้',
      icon: 'Games.png'
    },
    {
      name: 'ยานยนต์',
      icon: 'vehicle.png'
    },
    {
      name: 'เสื้อผ้าแฟชั่นผู้หญิง',
      icon: 'FemaleFashion.png'
    },
    {
      name: 'ความงามและของใช้ส่วนตัว',
      icon: 'beauty.png'
    },
    {
      name: 'ของเล่นและสินค้าแม่และเด็ก',
      icon: 'Toys.png'
    },
    {
      name: 'เครื่องใช้ในบ้าน',
      icon: 'Furniture.png'
    },
    {
      name: 'กระเป๋า',
      icon: 'Bag.png'
    },
    {
      name: 'รองเท้าผู้หญิง',
      icon: 'FemaleShue.png'
    },
    {
      name: 'เครื่องประดับ',
      icon: 'Accessories.png'
    },
    {
      name: 'อาหารและเครื่องดื่ม',
      icon: 'Foods.png'
    },
    {
      name: 'เครื่องใช้ไฟฟ้าภายในบ้าน',
      icon: 'HomeAppliances.png'
    },
    {
      name: 'สัตว์เลี้ยง',
      icon: 'Pets.png'
    },
    {
      name: 'เครื่องเขียน หนังสือ และดนตรี',
      icon: 'Stationery.png'
    },
    {
      name: 'อื่นๆ',
      icon: 'Other.png'
    },

  ],
};
export default data;

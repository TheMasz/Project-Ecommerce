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
      category: "เสื้อผ้าแฟชั่นผู้ชาย",
      nodes: [
        {
          category: "เสื้อเชิ้ต",
          nodes: [
          {category:"เสื้อเชิ้ตสีพื้น"},
            {category:"เสื้อเชิ้ตลาย"},
            {category:"เสื้อเชิ้ตลายสก็อต"},
            {category:"เสื้อเชิ้ตอื่นๆ"},
          ],
        },
        {
          category: "เสื้อยืด",
          nodes: [
            {category:"เสื้อยืดสีพื้น"},
            {category:"เสื้อยืดลาย"},
            {category:"เสื้อยืดลายทาง"},
            {category:"เสื้อยืดสกีนตัวหนังสือ"},
            {category:"เสื้อยืดลายการ์ตูน"},
            {category:"เสื้อแขนกุด"},
            {category:"เสื้อยืดอื่นๆ"},
          ],
        },
      ],
    },
    {
      category: "เสื้อผ้าแฟชั่นผู้หญิง",
      nodes: [
        {
          category: "เสื้อ",
        },
        {
          category: "เดรส",
        },
      ],
    },
    {
      category: "มือถือและอุปกรณ์เสริม",
      nodes: [
        {
          category: "โทรศัพท์มือถือ",
        },
        {
          category: "แท็บเล็ต",
        },
      ],
    },
  ],
};
export default data;

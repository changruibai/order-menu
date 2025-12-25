import { Category } from '../types';

// 菜单数据 - 使用更精准的美食图片
export const menuData: Category[] = [
  {
    id: 'meat',
    name: '肉类',
    icon: '🥩',
    dishes: [
      {
        id: 'gongbaojiding',
        name: '宫保鸡丁',
        description: '香辣微甜，花生酥脆',
        image: '/images/dishes/gongbaojiding.jpg',
        category: 'meat',
        tags: ['微辣', '经典']
      },
      {
        id: 'kaojiyi',
        name: '烤鸡翅',
        description: '外酥里嫩，香气四溢',
        image: 'https://images.pexels.com/photos/60616/fried-chicken-chicken-fried-crunchy-60616.jpeg?w=400&h=300&fit=crop',
        category: 'meat',
        tags: ['烧烤', '人气']
      },
      {
        id: 'kelejichi',
        name: '可乐鸡翅',
        description: '甜香入味，肉质软嫩',
        image: '/images/dishes/kelejichi.jpeg',
        category: 'meat',
        tags: ['甜口', '下饭']
      },
      {
        id: 'heishaoniurou',
        name: '黑椒牛柳',
        description: '黑椒浓郁，牛肉嫩滑',
        image: '/images/dishes/heijiaoniuliu.jpeg',
        category: 'meat',
        tags: ['西餐', '人气']
      },
      {
        id: 'xinjiangdapan',
        name: '新疆大盘鸡',
        description: '土豆软糯，鸡肉入味',
        image: '/images/dishes/dapanji.jpeg',
        category: 'meat',
        tags: ['新疆', '下饭']
      },
      {
        id: 'koushuiji',
        name: '口水鸡',
        description: '麻辣鲜香，口感嫩滑',
        image: '/images/dishes/koushuiji.jpeg',
        category: 'meat',
        tags: ['川菜', '凉菜']
      },
    ]
  },
  {
    id: 'seafood',
    name: '海鲜',
    icon: '🦐',
    dishes: [
      {
        id: 'qingzhengyu',
        name: '清蒸鱼',
        description: '鲜嫩清香，原汁原味',
        image: '/images/dishes/qingzhengyu.jpeg',
        category: 'seafood',
        tags: ['清淡', '健康']
      },
      {
        id: 'youmendaxia',
        name: '油焖大虾',
        description: '鲜香四溢，Q弹入味',
        image: '/images/dishes/youmendaxia.jpeg',
        category: 'seafood',
        tags: ['人气', '鲜美']
      },
    ]
  },
  {
    id: 'vegetable',
    name: '蔬菜',
    icon: '🥬',
    dishes: [
      {
        id: 'xihongshichaojidan',
        name: '番茄炒蛋',
        description: '酸甜开胃，老少皆宜',
        image: '/images/dishes/xihongshichaojidan.jpeg',
        category: 'vegetable',
        tags: ['经典', '快手']
      },
      {
        id: 'haoyoushengcai',
        name: '蚝油生菜',
        description: '酸爽脆嫩，开胃解腻',
        image: '/images/dishes/haoyoushengcai.jpeg',
        category: 'vegetable',
        tags: ['清淡', '爽口']
      },
      {
        id: 'chaotudousi',
        name: '炒土豆丝',
        description: '土豆丝炒得面面的，很好吃下饭',
        image: '/images/dishes/chaotudousi.jpeg',
        category: 'vegetable',
        tags: ['东北菜', '下饭']
      },
      {
        id: 'hongshaoyeqizi',
        name: '红烧茄子',
        description: '软糯入味，酱香浓郁',
        image: '/images/dishes/hongshaoqiezi.jpeg',
        category: 'vegetable',
        tags: ['下饭', '家常']
      },
      {
        id: 'qingchaoxilan',
        name: '清炒西兰花',
        description: '翠绿爽脆，营养丰富',
        image: 'https://images.pexels.com/photos/1359326/pexels-photo-1359326.jpeg?w=400&h=300&fit=crop',
        category: 'vegetable',
        tags: ['健康', '清淡']
      },
    ]
  },
  {
    id: 'soup',
    name: '汤品',
    icon: '🍲',
    dishes: [
      {
        id: 'fanqiedanhuatang',
        name: '番茄蛋花汤',
        description: '酸甜鲜香，营养开胃',
        image: '/images/dishes/fanqiedanhuatang.jpeg',
        category: 'soup',
        tags: ['清淡', '快手']
      },
      {
        id: 'zicaidantang',
        name: '紫菜蛋汤',
        description: '鲜香可口，简单美味',
        image: '/images/dishes/zicaidantang.jpeg',
        category: 'soup',
        tags: ['快手', '经典']
      },
    ]
  },
  {
    id: 'staple',
    name: '主食',
    icon: '🍚',
    dishes: [
      {
        id: 'baimifan',
        name: '白米饭',
        description: '香软可口，百搭主食',
        image: '/images/dishes/baimifan.jpeg',
        category: 'staple',
        tags: ['主食']
      },
      {
        id: 'danchaofan',
        name: '蛋炒饭',
        description: '粒粒分明，蛋香四溢',
        image: '/images/dishes/danchaofan.jpeg',
        category: 'staple',
        tags: ['经典', '快手']
      },
      {
        id: 'chaomian',
        name: '炒面',
        description: '劲道爽滑，酱香浓郁',
        image: '/images/dishes/chaomian.avif',
        category: 'staple',
        tags: ['快手', '下饭']
      },
    ]
  },
  {
    id: 'airfryer',
    name: '空气炸锅',
    icon: '🍳',
    dishes: [
      {
        id: 'zhajichi',
        name: '炸鸡翅',
        description: '外酥里嫩，低油健康',
        image: 'https://images.pexels.com/photos/60616/fried-chicken-chicken-fried-crunchy-60616.jpeg?w=400&h=300&fit=crop',
        category: 'airfryer',
        tags: ['人气', '低油']
      },
      {
        id: 'zhashutiao',
        name: '炸薯条',
        description: '金黄酥脆，香气四溢',
        image: 'https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg?w=400&h=300&fit=crop',
        category: 'airfryer',
        tags: ['经典', '酥脆']
      },
      {
        id: 'suanrongqiezi',
        name: '蒜蓉茄子',
        description: '软糯入味，蒜香浓郁',
        image: '/images/dishes/suanrongqiezi.jpeg',
        category: 'airfryer',
        tags: ['素食', '健康']
      },
      {
        id: 'danta',
        name: '蛋挞',
        description: '外酥里嫩，蛋香四溢',
        image: '/images/dishes/danta.jpeg',
        category: 'airfryer',
        tags: ['海鲜', '酥脆']
      },
      {
        id: 'kaohongshu',
        name: '烤红薯',
        description: '香甜软糯，营养丰富',
        image: '/images/dishes/kaohongshu.jpeg',
        category: 'airfryer',
        tags: ['甜口', '下饭']
      },
      {
        id: 'jiaoyanmogu',
        name: '椒盐蘑菇',
        description: '椒盐味浓郁，蘑菇酥脆',
        image: '/images/dishes/jiaoyanmogu.jpeg',
        category: 'airfryer',
        tags: ['素食', '健康']
      },
    ]
  }
];

// 获取所有菜品
export const getAllDishes = () => {
  return menuData.flatMap(category => category.dishes);
};

// 根据分类获取菜品
export const getDishesByCategory = (categoryId: string) => {
  const category = menuData.find(c => c.id === categoryId);
  return category?.dishes || [];
};

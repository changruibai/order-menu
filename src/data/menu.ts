import { Category } from '../types';

// 菜单数据 - 使用 Unsplash 高质量美食图片
export const menuData: Category[] = [
  {
    id: 'meat',
    name: '肉类',
    icon: '🥩',
    dishes: [
      {
        id: 'hongshaorou',
        name: '红烧肉',
        description: '肥而不腻，入口即化',
        image: 'https://images.unsplash.com/photo-1623689046286-addbd9474e05?w=400&h=300&fit=crop',
        category: 'meat',
        tags: ['经典', '下饭']
      },
      {
        id: 'tangcupaigu',
        name: '糖醋排骨',
        description: '酸甜可口，外酥里嫩',
        image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop',
        category: 'meat',
        tags: ['酸甜', '人气']
      },
      {
        id: 'gongbaojiding',
        name: '宫保鸡丁',
        description: '香辣微甜，花生酥脆',
        image: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?w=400&h=300&fit=crop',
        category: 'meat',
        tags: ['微辣', '经典']
      },
      {
        id: 'jiangbaorousi',
        name: '酱爆肉丝',
        description: '酱香浓郁，嫩滑可口',
        image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop',
        category: 'meat',
        tags: ['下饭']
      },
      {
        id: 'qingjiaorousi',
        name: '青椒肉丝',
        description: '清香爽口，家常美味',
        image: 'https://images.unsplash.com/photo-1547928578-bca3e9c0f90f?w=400&h=300&fit=crop',
        category: 'meat',
        tags: ['家常', '清淡']
      },
      {
        id: 'huiliguorou',
        name: '回锅肉',
        description: '四川名菜，肥而不腻',
        image: 'https://images.unsplash.com/photo-1608835291093-394b0c943a75?w=400&h=300&fit=crop',
        category: 'meat',
        tags: ['川菜', '下饭']
      }
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
        image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400&h=300&fit=crop',
        category: 'seafood',
        tags: ['清淡', '健康']
      },
      {
        id: 'youmenxia',
        name: '油焖大虾',
        description: '鲜香四溢，Q弹入味',
        image: 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=400&h=300&fit=crop',
        category: 'seafood',
        tags: ['人气', '鲜美']
      },
      {
        id: 'suanxiangxia',
        name: '蒜蓉虾',
        description: '蒜香浓郁，虾肉鲜甜',
        image: 'https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?w=400&h=300&fit=crop',
        category: 'seafood',
        tags: ['蒜香']
      },
      {
        id: 'chaoxian',
        name: '炒蛤蜊',
        description: '鲜嫩多汁，葱香扑鼻',
        image: 'https://images.unsplash.com/photo-1534604973900-c43ab4c2e0ab?w=400&h=300&fit=crop',
        category: 'seafood',
        tags: ['鲜美', '快手']
      }
    ]
  },
  {
    id: 'vegetable',
    name: '蔬菜',
    icon: '🥬',
    dishes: [
      {
        id: 'fanqiechaodan',
        name: '番茄炒蛋',
        description: '酸甜开胃，老少皆宜',
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop',
        category: 'vegetable',
        tags: ['经典', '快手']
      },
      {
        id: 'suancaibaicai',
        name: '醋溜白菜',
        description: '酸爽脆嫩，开胃解腻',
        image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop',
        category: 'vegetable',
        tags: ['清淡', '爽口']
      },
      {
        id: 'disamxian',
        name: '地三鲜',
        description: '土豆茄子青椒，东北名菜',
        image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop',
        category: 'vegetable',
        tags: ['东北菜', '下饭']
      },
      {
        id: 'chaodoumiao',
        name: '蒜蓉豆苗',
        description: '清脆嫩绿，蒜香扑鼻',
        image: 'https://images.unsplash.com/photo-1574484284002-952d92456975?w=400&h=300&fit=crop',
        category: 'vegetable',
        tags: ['清淡', '健康']
      },
      {
        id: 'chaomuer',
        name: '木耳炒山药',
        description: '脆嫩滑爽，营养丰富',
        image: 'https://images.unsplash.com/photo-1543339308-43e59d6b73a6?w=400&h=300&fit=crop',
        category: 'vegetable',
        tags: ['养生', '清淡']
      },
      {
        id: 'ganbiansijidou',
        name: '干煸四季豆',
        description: '外焦里嫩，香辣可口',
        image: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=400&h=300&fit=crop',
        category: 'vegetable',
        tags: ['川菜', '下饭']
      }
    ]
  },
  {
    id: 'soup',
    name: '汤品',
    icon: '🍲',
    dishes: [
      {
        id: 'fanqiejidantang',
        name: '番茄蛋花汤',
        description: '酸甜鲜香，营养开胃',
        image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=300&fit=crop',
        category: 'soup',
        tags: ['清淡', '快手']
      },
      {
        id: 'zicaitang',
        name: '紫菜蛋汤',
        description: '鲜香可口，简单美味',
        image: 'https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?w=400&h=300&fit=crop',
        category: 'soup',
        tags: ['快手', '经典']
      },
      {
        id: 'yumitang',
        name: '玉米排骨汤',
        description: '清甜滋补，营养丰富',
        image: 'https://images.unsplash.com/photo-1603105037880-880cd4edfb0d?w=400&h=300&fit=crop',
        category: 'soup',
        tags: ['滋补', '慢炖']
      },
      {
        id: 'suanlatang',
        name: '酸辣汤',
        description: '酸辣开胃，暖身暖胃',
        image: 'https://images.unsplash.com/photo-1555126634-323283e090fa?w=400&h=300&fit=crop',
        category: 'soup',
        tags: ['开胃', '微辣']
      }
    ]
  },
  {
    id: 'staple',
    name: '主食',
    icon: '🍚',
    dishes: [
      {
        id: 'baifan',
        name: '白米饭',
        description: '香软可口，百搭主食',
        image: 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=400&h=300&fit=crop',
        category: 'staple',
        tags: ['主食']
      },
      {
        id: 'danchaofan',
        name: '蛋炒饭',
        description: '粒粒分明，蛋香四溢',
        image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop',
        category: 'staple',
        tags: ['经典', '快手']
      },
      {
        id: 'jiaozi',
        name: '水饺',
        description: '皮薄馅大，鲜香多汁',
        image: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=400&h=300&fit=crop',
        category: 'staple',
        tags: ['传统', '人气']
      },
      {
        id: 'chaomian',
        name: '炒面',
        description: '劲道爽滑，酱香浓郁',
        image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400&h=300&fit=crop',
        category: 'staple',
        tags: ['快手', '下饭']
      }
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


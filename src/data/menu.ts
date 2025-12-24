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
        image: 'https://images.pexels.com/photos/6210747/pexels-photo-6210747.jpeg?w=400&h=300&fit=crop',
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
        image: 'https://images.pexels.com/photos/3763847/pexels-photo-3763847.jpeg?w=400&h=300&fit=crop',
        category: 'seafood',
        tags: ['清淡', '健康']
      },
      {
        id: 'youmenxia',
        name: '油焖大虾',
        description: '鲜香四溢，Q弹入味',
        image: 'https://images.pexels.com/photos/3296279/pexels-photo-3296279.jpeg?w=400&h=300&fit=crop',
        category: 'seafood',
        tags: ['人气', '鲜美']
      },
      {
        id: 'suanxiangxia',
        name: '蒜蓉虾',
        description: '蒜香浓郁，虾肉鲜甜',
        image: 'https://images.pexels.com/photos/725991/pexels-photo-725991.jpeg?w=400&h=300&fit=crop',
        category: 'seafood',
        tags: ['蒜香']
      },
      {
        id: 'chaoxian',
        name: '炒蛤蜊',
        description: '鲜嫩多汁，葱香扑鼻',
        image: 'https://images.pexels.com/photos/4553111/pexels-photo-4553111.jpeg?w=400&h=300&fit=crop',
        category: 'seafood',
        tags: ['鲜美', '快手']
      },
      {
        id: 'shuizhuyu',
        name: '水煮鱼',
        description: '麻辣鲜香，鱼肉嫩滑',
        image: 'https://images.pexels.com/photos/3186654/pexels-photo-3186654.jpeg?w=400&h=300&fit=crop',
        category: 'seafood',
        tags: ['川菜', '麻辣']
      },
      {
        id: 'suancaiyu',
        name: '酸菜鱼',
        description: '酸辣开胃，鱼片鲜嫩',
        image: 'https://images.pexels.com/photos/5409011/pexels-photo-5409011.jpeg?w=400&h=300&fit=crop',
        category: 'seafood',
        tags: ['川菜', '酸辣']
      },
      {
        id: 'qiezikaoyu',
        name: '烤鱼',
        description: '外焦里嫩，香料浓郁',
        image: 'https://images.pexels.com/photos/2374946/pexels-photo-2374946.jpeg?w=400&h=300&fit=crop',
        category: 'seafood',
        tags: ['烧烤', '人气']
      },
      {
        id: 'chaoxiaoyu',
        name: '椒盐小黄鱼',
        description: '外酥里嫩，椒盐飘香',
        image: 'https://images.pexels.com/photos/1516415/pexels-photo-1516415.jpeg?w=400&h=300&fit=crop',
        category: 'seafood',
        tags: ['酥脆', '下酒']
      },
      {
        id: 'longxiafan',
        name: '龙虾饭',
        description: '龙虾鲜甜，米饭入味',
        image: 'https://images.pexels.com/photos/1211887/pexels-photo-1211887.jpeg?w=400&h=300&fit=crop',
        category: 'seafood',
        tags: ['人气', '鲜美']
      },
      {
        id: 'chaoyouyu',
        name: '爆炒鱿鱼',
        description: 'Q弹爽脆，酱香浓郁',
        image: 'https://images.pexels.com/photos/4553025/pexels-photo-4553025.jpeg?w=400&h=300&fit=crop',
        category: 'seafood',
        tags: ['快炒', '下饭']
      },
      {
        id: 'qingzhenghaixian',
        name: '清蒸螃蟹',
        description: '蟹黄饱满，肉质鲜美',
        image: 'https://images.pexels.com/photos/1448721/pexels-photo-1448721.jpeg?w=400&h=300&fit=crop',
        category: 'seafood',
        tags: ['清蒸', '时令']
      },
      {
        id: 'haixianchaofen',
        name: '海鲜炒粉',
        description: '粉条爽滑，海鲜丰富',
        image: 'https://images.pexels.com/photos/2347311/pexels-photo-2347311.jpeg?w=400&h=300&fit=crop',
        category: 'seafood',
        tags: ['主食', '鲜美']
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
        image: 'https://images.pexels.com/photos/6406463/pexels-photo-6406463.jpeg?w=400&h=300&fit=crop',
        category: 'vegetable',
        tags: ['经典', '快手']
      },
      {
        id: 'suancaibaicai',
        name: '醋溜白菜',
        description: '酸爽脆嫩，开胃解腻',
        image: 'https://images.pexels.com/photos/2893635/pexels-photo-2893635.jpeg?w=400&h=300&fit=crop',
        category: 'vegetable',
        tags: ['清淡', '爽口']
      },
      {
        id: 'disamxian',
        name: '地三鲜',
        description: '土豆茄子青椒，东北名菜',
        image: 'https://images.pexels.com/photos/5409031/pexels-photo-5409031.jpeg?w=400&h=300&fit=crop',
        category: 'vegetable',
        tags: ['东北菜', '下饭']
      },
      {
        id: 'chaodoumiao',
        name: '蒜蓉豆苗',
        description: '清脆嫩绿，蒜香扑鼻',
        image: 'https://images.pexels.com/photos/1656666/pexels-photo-1656666.jpeg?w=400&h=300&fit=crop',
        category: 'vegetable',
        tags: ['清淡', '健康']
      },
      {
        id: 'chaomuer',
        name: '木耳炒山药',
        description: '脆嫩滑爽，营养丰富',
        image: 'https://images.pexels.com/photos/5836779/pexels-photo-5836779.jpeg?w=400&h=300&fit=crop',
        category: 'vegetable',
        tags: ['养生', '清淡']
      },
      {
        id: 'ganbiansijidou',
        name: '干煸四季豆',
        description: '外焦里嫩，香辣可口',
        image: 'https://images.pexels.com/photos/5419336/pexels-photo-5419336.jpeg?w=400&h=300&fit=crop',
        category: 'vegetable',
        tags: ['川菜', '下饭']
      },
      {
        id: 'shaoqiezi',
        name: '红烧茄子',
        description: '软糯入味，酱香浓郁',
        image: 'https://images.pexels.com/photos/5836781/pexels-photo-5836781.jpeg?w=400&h=300&fit=crop',
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
      {
        id: 'mapodoufu',
        name: '麻婆豆腐',
        description: '麻辣鲜香，嫩滑爽口',
        image: 'https://images.pexels.com/photos/6210959/pexels-photo-6210959.jpeg?w=400&h=300&fit=crop',
        category: 'vegetable',
        tags: ['川菜', '经典']
      },
      {
        id: 'chaobocai',
        name: '蒜蓉炒菠菜',
        description: '翠绿鲜嫩，蒜香浓郁',
        image: 'https://images.pexels.com/photos/2325843/pexels-photo-2325843.jpeg?w=400&h=300&fit=crop',
        category: 'vegetable',
        tags: ['健康', '快手']
      },
      {
        id: 'jiachangdoufu',
        name: '家常豆腐',
        description: '外酥里嫩，酱香可口',
        image: 'https://images.pexels.com/photos/5409007/pexels-photo-5409007.jpeg?w=400&h=300&fit=crop',
        category: 'vegetable',
        tags: ['家常', '下饭']
      },
      {
        id: 'chaonangua',
        name: '清炒南瓜',
        description: '软糯香甜，营养健康',
        image: 'https://images.pexels.com/photos/5792329/pexels-photo-5792329.jpeg?w=400&h=300&fit=crop',
        category: 'vegetable',
        tags: ['清淡', '养生']
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
        image: 'https://images.pexels.com/photos/539451/pexels-photo-539451.jpeg?w=400&h=300&fit=crop',
        category: 'soup',
        tags: ['清淡', '快手']
      },
      {
        id: 'zicaitang',
        name: '紫菜蛋汤',
        description: '鲜香可口，简单美味',
        image: 'https://images.pexels.com/photos/1731535/pexels-photo-1731535.jpeg?w=400&h=300&fit=crop',
        category: 'soup',
        tags: ['快手', '经典']
      },
      {
        id: 'suanlatang',
        name: '酸辣汤',
        description: '酸辣开胃，暖身暖胃',
        image: 'https://images.pexels.com/photos/5409023/pexels-photo-5409023.jpeg?w=400&h=300&fit=crop',
        category: 'soup',
        tags: ['开胃', '微辣']
      },
      {
        id: 'jitang',
        name: '老母鸡汤',
        description: '汤鲜味美，滋补养身',
        image: 'https://images.pexels.com/photos/2133989/pexels-photo-2133989.jpeg?w=400&h=300&fit=crop',
        category: 'soup',
        tags: ['滋补', '慢炖']
      },
      {
        id: 'doufutang',
        name: '豆腐海带汤',
        description: '清淡鲜美，营养丰富',
        image: 'https://images.pexels.com/photos/3026808/pexels-photo-3026808.jpeg?w=400&h=300&fit=crop',
        category: 'soup',
        tags: ['清淡', '健康']
      },
      {
        id: 'yumijitang',
        name: '玉米鸡汤',
        description: '清甜滋补，营养丰富',
        image: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?w=400&h=300&fit=crop',
        category: 'soup',
        tags: ['滋补', '慢炖']
      },
      {
        id: 'wantouhuntun',
        name: '馄饨汤',
        description: '皮薄馅嫩，汤鲜味美',
        image: 'https://images.pexels.com/photos/4969892/pexels-photo-4969892.jpeg?w=400&h=300&fit=crop',
        category: 'soup',
        tags: ['经典', '暖胃']
      },
      {
        id: 'niuroutang',
        name: '牛肉萝卜汤',
        description: '汤浓肉嫩，萝卜软糯',
        image: 'https://images.pexels.com/photos/6072188/pexels-photo-6072188.jpeg?w=400&h=300&fit=crop',
        category: 'soup',
        tags: ['滋补', '暖胃']
      },
      {
        id: 'dongguatang',
        name: '冬瓜虾皮汤',
        description: '清淡爽口，消暑解腻',
        image: 'https://images.pexels.com/photos/1731535/pexels-photo-1731535.jpeg?w=400&h=300&fit=crop',
        category: 'soup',
        tags: ['清淡', '消暑']
      },
      {
        id: 'yutoudoufu',
        name: '鱼头豆腐汤',
        description: '汤白如乳，鲜香浓郁',
        image: 'https://images.pexels.com/photos/8969237/pexels-photo-8969237.jpeg?w=400&h=300&fit=crop',
        category: 'soup',
        tags: ['鲜美', '滋补']
      },
      {
        id: 'luosongtang',
        name: '罗宋汤',
        description: '酸甜浓郁，营养丰富',
        image: 'https://images.pexels.com/photos/2474658/pexels-photo-2474658.jpeg?w=400&h=300&fit=crop',
        category: 'soup',
        tags: ['西餐', '开胃']
      },
      {
        id: 'yangroutang',
        name: '羊肉汤',
        description: '汤浓肉烂，暖身暖胃',
        image: 'https://images.pexels.com/photos/6072192/pexels-photo-6072192.jpeg?w=400&h=300&fit=crop',
        category: 'soup',
        tags: ['滋补', '暖胃']
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
        image: 'https://images.pexels.com/photos/723198/pexels-photo-723198.jpeg?w=400&h=300&fit=crop',
        category: 'staple',
        tags: ['主食']
      },
      {
        id: 'danchaofan',
        name: '蛋炒饭',
        description: '粒粒分明，蛋香四溢',
        image: 'https://images.pexels.com/photos/1410235/pexels-photo-1410235.jpeg?w=400&h=300&fit=crop',
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
      {
        id: 'niuroufan',
        name: '牛肉盖浇饭',
        description: '牛肉嫩滑，酱香浓郁',
        image: 'https://images.pexels.com/photos/6210747/pexels-photo-6210747.jpeg?w=400&h=300&fit=crop',
        category: 'staple',
        tags: ['下饭', '人气']
      },
      {
        id: 'yangzhoufan',
        name: '扬州炒饭',
        description: '配料丰富，粒粒分明',
        image: 'https://images.pexels.com/photos/1410236/pexels-photo-1410236.jpeg?w=400&h=300&fit=crop',
        category: 'staple',
        tags: ['经典', '人气']
      },
      {
        id: 'lamian',
        name: '手工拉面',
        description: '劲道爽滑，汤鲜味美',
        image: 'https://images.pexels.com/photos/2664216/pexels-photo-2664216.jpeg?w=400&h=300&fit=crop',
        category: 'staple',
        tags: ['传统', '人气']
      },
      {
        id: 'niuroubing',
        name: '牛肉馅饼',
        description: '外酥里嫩，肉馅鲜美',
        image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?w=400&h=300&fit=crop',
        category: 'staple',
        tags: ['传统', '人气']
      },
      {
        id: 'mantou',
        name: '手工馒头',
        description: '松软可口，麦香浓郁',
        image: 'https://images.pexels.com/photos/5410400/pexels-photo-5410400.jpeg?w=400&h=300&fit=crop',
        category: 'staple',
        tags: ['传统', '主食']
      },
      {
        id: 'jirouchaofan',
        name: '鸡肉炒饭',
        description: '鸡肉鲜嫩，粒粒分明',
        image: 'https://images.pexels.com/photos/262897/pexels-photo-262897.jpeg?w=400&h=300&fit=crop',
        category: 'staple',
        tags: ['快手', '下饭']
      },
      {
        id: 'haixianchaofan',
        name: '海鲜炒饭',
        description: '海鲜鲜美，香气扑鼻',
        image: 'https://images.pexels.com/photos/723198/pexels-photo-723198.jpeg?w=400&h=300&fit=crop',
        category: 'staple',
        tags: ['鲜美', '人气']
      },
      {
        id: 'dandanmian',
        name: '担担面',
        description: '麻辣鲜香，面条劲道',
        image: 'https://images.pexels.com/photos/1907228/pexels-photo-1907228.jpeg?w=400&h=300&fit=crop',
        category: 'staple',
        tags: ['川菜', '麻辣']
      }
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
        id: 'kaoniuroupian',
        name: '烤牛肉片',
        description: '嫩滑多汁，香料丰富',
        image: 'https://images.pexels.com/photos/3535383/pexels-photo-3535383.jpeg?w=400&h=300&fit=crop',
        category: 'airfryer',
        tags: ['低油', '高蛋白']
      },
      {
        id: 'zhajikuai',
        name: '香酥鸡块',
        description: '外酥里嫩，鸡肉鲜美',
        image: 'https://images.pexels.com/photos/6210765/pexels-photo-6210765.jpeg?w=400&h=300&fit=crop',
        category: 'airfryer',
        tags: ['人气', '快手']
      },
      {
        id: 'kaoqiezi',
        name: '烤茄子',
        description: '软糯入味，蒜香浓郁',
        image: 'https://images.pexels.com/photos/4144234/pexels-photo-4144234.jpeg?w=400&h=300&fit=crop',
        category: 'airfryer',
        tags: ['素食', '健康']
      },
      {
        id: 'zhaxiaoyu',
        name: '炸小黄鱼',
        description: '外酥里嫩，香脆可口',
        image: 'https://images.pexels.com/photos/1516415/pexels-photo-1516415.jpeg?w=400&h=300&fit=crop',
        category: 'airfryer',
        tags: ['海鲜', '酥脆']
      },
      {
        id: 'kaoyangrou',
        name: '烤羊肉串',
        description: '孜然飘香，嫩滑多汁',
        image: 'https://images.pexels.com/photos/1251198/pexels-photo-1251198.jpeg?w=400&h=300&fit=crop',
        category: 'airfryer',
        tags: ['新疆', '烧烤']
      },
      {
        id: 'zhaxia',
        name: '椒盐炸虾',
        description: 'Q弹爽脆，椒盐飘香',
        image: 'https://images.pexels.com/photos/725991/pexels-photo-725991.jpeg?w=400&h=300&fit=crop',
        category: 'airfryer',
        tags: ['海鲜', '酥脆']
      },
      {
        id: 'kaomoguer',
        name: '烤蘑菇',
        description: '鲜香多汁，口感嫩滑',
        image: 'https://images.pexels.com/photos/4198018/pexels-photo-4198018.jpeg?w=400&h=300&fit=crop',
        category: 'airfryer',
        tags: ['素食', '健康']
      },
      {
        id: 'kaodoufu',
        name: '烤豆腐',
        description: '外焦里嫩，酱香浓郁',
        image: 'https://images.pexels.com/photos/5409007/pexels-photo-5409007.jpeg?w=400&h=300&fit=crop',
        category: 'airfryer',
        tags: ['素食', '低卡']
      },
      {
        id: 'zhayouyuquan',
        name: '炸鱿鱼圈',
        description: 'Q弹酥脆，金黄诱人',
        image: 'https://images.pexels.com/photos/4553025/pexels-photo-4553025.jpeg?w=400&h=300&fit=crop',
        category: 'airfryer',
        tags: ['海鲜', '人气']
      },
      {
        id: 'kaojitui',
        name: '烤鸡腿',
        description: '外焦里嫩，肉质鲜美',
        image: 'https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg?w=400&h=300&fit=crop',
        category: 'airfryer',
        tags: ['人气', '高蛋白']
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

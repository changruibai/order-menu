import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Send, User, FileText, CheckCircle, Loader2 } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { useOrderStore } from '../store/orderStore';
import { getAssetUrl } from '../utils/getAssetUrl';

interface OrderPageProps {
  isOpen: boolean;
  onClose: () => void;
  notifyKey: string;
}

const OrderPage: React.FC<OrderPageProps> = ({ isOpen, onClose, notifyKey }) => {
  const { items, clearCart } = useCartStore();
  const { addOrder } = useOrderStore();
  
  const [userName, setUserName] = useState('');
  const [note, setNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // 发送通知
  const sendNotification = async (orderInfo: string) => {
    if (!notifyKey) {
      console.log('未配置通知Key，跳过通知');
      return true;
    }

    try {
      // 使用 Server酱 发送通知
      const response = await fetch(`https://sctapi.ftqq.com/${notifyKey}.send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          title: `📋 新订单来了！`,
          desp: orderInfo,
        }),
      });
      
      return response.ok;
    } catch (error) {
      console.error('通知发送失败:', error);
      return false;
    }
  };

  const handleSubmit = async () => {
    if (!userName.trim()) {
      alert('请输入你的名字');
      return;
    }

    if (items.length === 0) {
      alert('购物车是空的');
      return;
    }

    setIsSubmitting(true);

    try {
      // 创建订单
      const order = addOrder(items, note, userName);

      // 构建通知内容
      const dishList = items
        .map(item => `- ${item.dish.name} × ${item.quantity}`)
        .join('\n');
      
      const orderInfo = `
## 下单人
${userName}

## 菜品列表
${dishList}

## 备注
${note || '无'}

## 订单号
${order.id}

## 下单时间
${new Date().toLocaleString('zh-CN')}
      `.trim();

      // 发送通知
      await sendNotification(orderInfo);

      // 清空购物车
      clearCart();
      
      // 显示成功状态
      setIsSuccess(true);

      // 3秒后关闭
      setTimeout(() => {
        setIsSuccess(false);
        setUserName('');
        setNote('');
        onClose();
      }, 2500);

    } catch (error) {
      console.error('下单失败:', error);
      alert('下单失败，请重试');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-warm-50"
        >
          {/* 成功动画 */}
          <AnimatePresence>
            {isSuccess && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-50 bg-white flex flex-col items-center justify-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1.2, 1] }}
                  transition={{ duration: 0.5 }}
                >
                  <CheckCircle className="w-24 h-24 text-green-500" />
                </motion.div>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mt-4 text-xl font-semibold text-gray-800"
                >
                  下单成功！
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="mt-2 text-gray-500"
                >
                  已通知厨房准备
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* 头部 */}
          <header className="sticky top-0 glass border-b border-primary-100 px-4 py-3 flex items-center gap-3">
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-white/80 flex items-center justify-center hover:bg-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <h1 className="text-lg font-bold text-gray-800">确认订单</h1>
          </header>

          {/* 内容 */}
          <div className="p-4 pb-32 overflow-y-auto max-h-[calc(100vh-60px)]">
            {/* 用户信息 */}
            <div className="bg-white rounded-2xl p-4 card-shadow mb-4">
              <div className="flex items-center gap-2 mb-3">
                <User className="w-5 h-5 text-primary-500" />
                <span className="font-semibold text-gray-800">下单人</span>
              </div>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="输入你的名字"
                className="w-full px-4 py-3 bg-gray-50 rounded-xl border-2 border-transparent focus:border-primary-300 focus:bg-white outline-none transition-all"
              />
            </div>

            {/* 菜品列表 */}
            <div className="bg-white rounded-2xl p-4 card-shadow mb-4">
              <div className="flex items-center justify-between mb-3">
                <span className="font-semibold text-gray-800">已选菜品</span>
                <span className="text-sm text-gray-500">{items.length} 道菜</span>
              </div>
              <div className="space-y-3">
                {items.map((item) => (
                  <div key={item.dish.id} className="flex items-center gap-3">
                    <img
                      src={getAssetUrl(item.dish.image)}
                      alt={item.dish.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <span className="flex-1 text-gray-700">{item.dish.name}</span>
                    <span className="text-primary-600 font-medium">× {item.quantity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 备注 */}
            <div className="bg-white rounded-2xl p-4 card-shadow">
              <div className="flex items-center gap-2 mb-3">
                <FileText className="w-5 h-5 text-primary-500" />
                <span className="font-semibold text-gray-800">备注</span>
              </div>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="有什么特殊要求吗？（选填）"
                rows={3}
                className="w-full px-4 py-3 bg-gray-50 rounded-xl border-2 border-transparent focus:border-primary-300 focus:bg-white outline-none transition-all resize-none"
              />
            </div>
          </div>

          {/* 底部按钮 */}
          <div className="fixed bottom-0 left-0 right-0 p-4 glass border-t border-primary-100">
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full py-4 bg-gradient-to-r from-primary-500 to-primary-400 text-white font-semibold rounded-2xl shadow-lg shadow-primary-500/30 flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  提交中...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  确认下单
                </>
              )}
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default React.memo(OrderPage);


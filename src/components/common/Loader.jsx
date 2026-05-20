import { Compass, Hotel, Loader2, Plane } from "lucide-react";
import { motion } from "framer-motion";

const Loader = () => {
  return (
    <div className="min-h-screen flex flex-col items-center bg-secondary-foreground py-10 md:py-20">
      <div className="relative mb-10">
        <div className="absolute inset-0 bg-accent/20 rounded-full animate-ping opacity-25" />
        <div className="relative bg-white p-3 rounded-full shadow-xl">
          <Loader2 className="w-8 h-8 text-accent animate-spin" />
        </div>
      </div>
      <div className="relative flex flex-col items-center padd-container">
        <motion.div
          initial={{ y: 0 }}
          animate={{ y: [5, -5, 5] }}
          transition={{ repeat: Infinity, duration: 3.5 }}
        >
          <img
            className="w-55 py-15 md:py-5 md:w-65 lg:w-80"
            src="/public/SmartyAI.png"
            alt="Smarty AI"
          />
        </motion.div>
        {/* Hotel */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="absolute top-5 left-5 md:left-26 bg-card rounded-xl shadow-xl border p-3"
        >
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Hotel className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="text-xs font-semibold">Готелі</p>
              <p className="text-xs text-foreground">від 45€/ніч</p>
            </div>
          </div>
        </motion.div>
        {/* Airticket */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="absolute top-0 right-5 md:top-20 md:right-20 xl:top-20  bg-card rounded-xl shadow-xl border p-3"
        >
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Plane className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="text-xs font-semibold">Авиаквитки</p>
              <p className="text-xs text-foreground">від 30€</p>
            </div>
          </div>
        </motion.div>
        {/* Routs */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 1.8 }}
          className="absolute top-70 left-5 md:top-65 md:left-35 bg-card rounded-xl shadow-xl border p-3"
        >
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Compass className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="text-xs font-semibold">Маршрути</p>
              <p className="text-xs text-foreground">по днях</p>
            </div>
          </div>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 2.4 }}
          className="mt-10 text-center"
        >
          <span className="text-accent">Smarty</span> створює маршрут
          подорожі...
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 3.0 }}
          className="mt-4 text-center text-gray-600"
        >
          Зачекайте поки AI шукає авіаквитки, найкращі готелі, цікаві пам'ятки
          та локації...
        </motion.p>
      </div>
    </div>
  );
};

export default Loader;

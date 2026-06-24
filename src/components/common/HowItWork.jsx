import { motion } from "framer-motion";

const HowItWork = () => {
  return (
    <section id="how-it-work" className="max-padd-container py-10 lg:py-20">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center"
      >
        Як працює <span className="text-accent">AI Smarty Travels?</span>
      </motion.h2>
      <div className="mt-6 md:mt-10 grid gap-6 md:gap-10 grid-cols-1 lg:grid-cols-3">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="relative h-70 bg-secondary-foreground p-8 rounded-2xl shadow-sm hover:scale-102"
        >
          {/* Step 1 */}
          <div className="flex flex-col">
            <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center">
              <h3 className="text-white text-3xl">1.</h3>
            </div>
            <div className="mt-4">
              <h3 className="text-2xl">Куди хочете поїхати</h3>
              <p className="w-50 mt-2">
                Оберіть звідки і куди плануєте наступну подорож
              </p>
            </div>
            <img
              src="/location.svg"
              className="w-18 lg:w-12 xl:w-20 absolute bottom-8 right-8 lg:bottom-3 lg:right-3 xl:bottom-8 xl:right-8"
            />
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="relative h-70 bg-secondary-foreground p-8 rounded-2xl shadow-sm hover:scale-102"
        >
          {/* Step 2 */}
          <div className="flex flex-col">
            <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center">
              <h3 className="text-white text-3xl">2.</h3>
            </div>
            <div className="mt-4">
              <h3 className="text-2xl">Хто, коли і за скільки</h3>
              <p className="w-50 mt-2">
                Оберіть дати, бюджет подорожі та хто подорожує
              </p>
            </div>
            <img
              src="/calendar-st.svg"
              className="w-18 lg:w-12 xl:w-20 absolute bottom-8 right-8 lg:bottom-3 lg:right-3 xl:bottom-8 xl:right-8"
            />
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="relative h-70 bg-secondary-foreground p-8 rounded-2xl shadow-sm hover:scale-102"
        >
          {/* Step 3 */}
          <div className="flex flex-col">
            <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center">
              <h3 className="text-white text-3xl">3.</h3>
            </div>
            <div className="mt-4">
              <h3 className="text-2xl">Готовий план подорожі</h3>
              <p className="w-50 mt-2">
                Маршрут, квитки, готелі та бюджет - все в одному місці
              </p>
            </div>
            <img
              src="/one-way-trip.svg"
              className="w-18 lg:w-12 xl:w-20 absolute bottom-8 right-8 lg:bottom-3 lg:right-3 xl:bottom-8 xl:right-8"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWork;

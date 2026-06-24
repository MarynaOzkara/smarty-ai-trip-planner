import { motion } from "framer-motion";

const About = () => {
  return (
    <section className="py-10 lg:py-20 bg-secondary-foreground">
      <div className="max-padd-container">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          Про <span className="text-accent">AI Smarty Travels</span>
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 mt-6 md:mt-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className=""
          >
            <img
              src="/kyiv-barcelona-3-day-plan.webp"
              alt="3-денний маршрут Київ-Барселона"
            />
          </motion.div>
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="mt-8 text-2xl text-accent font-bold">Наша ідея</h3>
              <ul className="p-4 list-disc marker:text-accent list-inside border-b">
                <li>Створення маршруту подорожі за допомогою AI</li>
                <li>Автоматичний підбір визначних пам’яток і цікавих місць</li>
                <li>
                  Рекомендації щодо транспорту та пересування між локаціями
                </li>
                <li>Економія часу на пошук та аналіз інформації</li>
                <li>Розрахунок орієнтовного бюджету подорожі</li>
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <h3 className="mt-8 text-2xl text-accent font-bold">
                Наша місія
              </h3>
              <ul className="p-4 list-disc marker:text-accent list-inside border-b">
                <li>Зробити планування подорожей простим та доступним</li>
                <li>
                  Скоротити час на підготовку поїздки з годин до кількох хвилин
                </li>
                <li>
                  Допомагати знаходити оптимальні варіанти для будь-якого
                  бюджету
                </li>
                <li>
                  Створювати персоналізований маршрут по днях без ручного
                  планування
                </li>
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
            >
              <h3 className="mt-8 text-2xl text-accent font-bold">
                Наша унікальність
              </h3>
              <ul className="p-4 list-disc marker:text-accent list-inside border-b">
                <li>
                  Враховує актуальні особливості виїзду та подорожей з України
                </li>
                <li>Підбирає маршрути через аеропорти сусідніх країн</li>
                <li>Комбінує різні види транспорту: автобус, поїзд та літак</li>
                <li>
                  Дозволяє спланувати подорож швидше та практичніше в одному
                  сервісі
                </li>
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
            >
              <h3 className="mt-8 text-2xl text-accent font-bold">
                Наша пристрасть
              </h3>
              <ul className="p-4 list-disc marker:text-accent list-inside border-b">
                <li>
                  Допомагаємо планувати подорожі разом із домашніми улюбленцями
                </li>
                <li>Враховуємо pet-friendly готелі, заклади та активності</li>
                <li>Підбираємо маршрути, комфортні для власника та тварини</li>
                <li>
                  Формуємо рекомендації з урахуванням особливостей поїздки з
                  собакою або котиком
                </li>
                <li>
                  Робимо подорожі простішими, безпечнішими та комфортнішими для
                  всієї родини
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
        <div className="mt-6 md:mt-10 text-center">
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.9 }}
          >
            Якщо ви шукаєте зручний планувальник подорожей онлайн або AI
            itinerary planner, який допоможе організувати подорож без зайвого
            стресу, <b>AI Smarty Travels</b> стане вашим надійним помічником.
            Створіть свій маршрут уже сьогодні та відкрийте новий спосіб
            планування подорожей за допомогою штучного інтелекту.
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default About;

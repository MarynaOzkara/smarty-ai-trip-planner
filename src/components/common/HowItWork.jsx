const HowItWork = () => {
  return (
    <section id="how-it-work" className="max-padd-container py-10 lg:py-20">
      <h2 className="text-center">
        Як працює <span className="text-accent">AI Smarty Travels?</span>
      </h2>
      <div className="mt-6 md:mt-10 grid gap-6 md:gap-10 grid-cols-1 lg:grid-cols-3">
        <div className="relative h-70 bg-secondary-foreground p-8 rounded-2xl border border-muted-foreground shadow-sm hover:scale-105">
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
              className="w-22 lg:w-15 xl:w-25 absolute bottom-2 right-2"
              src="/Smarty-thinking.png"
              alt="Smarty Ai thinking"
            />
          </div>
        </div>
        <div className="relative h-70 bg-secondary-foreground p-8 rounded-2xl border border-muted-foreground shadow-sm hover:scale-105">
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
              className="w-30 lg:w-20 xl:w-35 absolute bottom-2 right-2"
              src="/Smarty-calendar.png"
              alt="Smarty Ai with calendar"
            />
          </div>
        </div>
        <div className="relative h-70 bg-secondary-foreground p-8 rounded-2xl border border-muted-foreground shadow-sm hover:scale-105">
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
              className="w-30 lg:w-20 xl:w-35 absolute bottom-2 right-2"
              src="/SmartyAI.png"
              alt="Smarty Ai trip plan"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWork;

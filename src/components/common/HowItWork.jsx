const HowItWork = () => {
  return (
    <section id="how-it-work" className="border max-padd-container py-20">
      <h2 className="text-center">
        Як працює <span className="text-accent">Smarty AI?</span>
      </h2>
      <div className="mt-10 grid gap-10 grid-cols-1 md:grid-cols-3">
        <div className="relative h-80 bg-secondary-foreground p-4 rounded-2xl border border-muted-foreground shadow-sm">
          {/* Step 1 */}
          <div className="flex gap-4 mt-2">
            <h3 className="text-accent">1</h3>
            <div>
              <h3 className="text-2xl">Куди хочете поїхати</h3>
              <p>Оберіть звідки і куди плануєте наступну подорож</p>
            </div>
            <img
              className="w-30 absolute bottom-5 right-5"
              src="/Smarty-thinking.png"
              alt="Smarty Ai thinking"
            />
          </div>
        </div>
        <div className="relative h-80 bg-secondary-foreground p-6 rounded-2xl border border-muted-foreground shadow-sm">
          {/* Step 2 */}
          <div className="flex gap-4 mt-2">
            <h3 className="text-accent">2</h3>
            <div>
              <h3 className="text-2xl">Хто, коли і за скільки</h3>
              <p>Оберіть дати, бюджет подорожі та хто подорожує</p>
            </div>
            <img
              className="w-40 absolute bottom-5 right-5"
              src="/Smarty-calendar.png"
              alt="Smarty Ai with calendar"
            />
          </div>
        </div>
        <div className="relative h-80 bg-secondary-foreground p-6 rounded-2xl border border-muted-foreground shadow-sm">
          {/* Step 3 */}
          <div className="flex gap-4 mt-2">
            <h3 className="text-accent">3</h3>
            <div>
              <h3 className="text-2xl">Готовий план подорожі</h3>
              <p>Маршрут, квитки, готелі та бюджет - все в одному місці</p>
            </div>
            <img
              className="w-40 absolute bottom-5 right-5"
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

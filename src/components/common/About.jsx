const About = () => {
  return (
    <section className="pt-10 lg:pt-20">
      <div className="max-padd-container">
        <h2 className="text-center">
          Про <span className="text-accent">AI Smarty Travels</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 mt-6 md:mt-10">
          <div className="rounded-2xl p-6 border hover:scale-105 shadow-sm">
            <h3 className="text-2xl text-accent font-bold pb-2">Наша ідея</h3>
            <p>
              Сучасний <b>AI планувальник подорожей</b>, який допомагає створити
              детальний маршрут за кілька хвилин. Замість годин пошуку
              інформації про визначні пам’ятки, транспорт, бюджет та цікаві
              місця, ви отримуєте готовий план подорожі, створений за допомогою
              штучного інтелекту.
            </p>
          </div>
          <div className="rounded-2xl p-6 border hover:scale-105 shadow-sm">
            <h3 className="text-2xl text-accent font-bold pb-2">Наша місія</h3>
            <p>
              Зробити планування подорожей простим, швидким та доступним для
              кожного. Наш AI Trip Planner аналізує обраний напрямок, тривалість
              поїздки та ваші побажання, після чого автоматично генерує
              персональний маршрут подорожі по днях.
            </p>
          </div>
          <div className="rounded-2xl p-6 border hover:scale-105 shadow-sm">
            <h3 className="text-2xl text-accent font-bold pb-2">
              Наша унікальність
            </h3>
            <p>
              Сервіс розроблений спеціально для українців і допомагає будувати
              маршрути з урахуванням актуальної логістики, включаючи трансфер до
              аеропортів сусідніх країн, комбіновані маршрути автобусом, поїздом
              та літаком. Це дозволяє отримати більш реалістичний та практичний
              план подорожі, адаптований саме для українських користувачів.
            </p>
          </div>
          <div className="rounded-2xl p-6 border hover:scale-105 shadow-sm">
            <h3 className="text-2xl text-accent font-bold pb-2">
              Наша пристрасть
            </h3>
            <p>
              <b>AI Smarty Travels</b> може створювати маршрути для
              мандрівників, які подорожують із собачкою або котиком, враховуючи
              pet-friendly активності, готелі та комфортний темп подорожі. Це
              допомагає заощадити час на пошук інформації та зробити подорож
              комфортною як для власника, так і для його пухнастого друга.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

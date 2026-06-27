import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const QUESTIONS = [
  {
    question: "Що таке AI Smarty Travels?",
    answer:
      "AI Smarty Travels — це AI-планувальник подорожей, який допомагає створити персоналізований маршрут за кілька хвилин. Сервіс аналізує ваші побажання, бюджет, тривалість поїздки та напрямок, після чого формує готовий план подорожі.",
  },
  {
    question: "Як працює AI-планувальник?",
    answer:
      "Достатньо вказати місто або країну призначення, дати поїздки та свої побажання. Штучний інтелект автоматично підбере цікаві місця, активності та сформує детальний маршрут по днях.",
  },
  {
    question: "Скільки часу займає створення маршруту?",
    answer:
      "У більшості випадків маршрут генерується менш ніж за хвилину, що дозволяє заощадити години на самостійному пошуку інформації.",
  },
  {
    question: "Чи підходить сервіс для українців?",
    answer:
      "Так. AI Smarty Travels створений з урахуванням потреб українських мандрівників. Сервіс враховує актуальну логістику, трансфери до аеропортів сусідніх країн та комбіновані маршрути різними видами транспорту.",
  },
  {
    question: "Чи враховує сервіс бюджет подорожі?",
    answer:
      "Так. AI Smarty Travels допомагає оцінити орієнтовні витрати на транспорт, проживання та основні активності, щоб ви могли краще спланувати свій бюджет.",
  },
  {
    question: "Чи можна подорожувати з домашніми тваринами?",
    answer:
      "Так. Сервіс підтримує планування подорожей із собаками та котиками, пропонуючи pet-friendly готелі, маршрути та активності.",
  },
];

const FAQ = () => {
  return (
    <section className="flex-center py-10 lg:py-20">
      <div className="max-padd-container">
        <h2 className="text-center">Часті запитання</h2>
        <Accordion
          className="mt-6"
          defaultValue={["question-0"]}
          type="multiple"
        >
          {QUESTIONS.map(({ question, answer }, index) => (
            <AccordionItem key={question} value={`question-${index}`}>
              <AccordionTrigger className="text-left text-2xl text-accent font-bold">
                {question}
              </AccordionTrigger>
              <AccordionContent className="text-lg font-[montserrat] text-card-foreground">
                {answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQ;

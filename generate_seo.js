const fs = require("fs");

// Definition of each page to optimize
const pages = [
  {
    url: "https://nexalc.com/tip-calculator/",
    file: "tip-calculator/index.html",
    type: "calculator",
    primaryKeyword: "Tip Calculator",
    newTitle: "Tip Calculator — Free Online Bill Calculator | NexAlc", // 53 chars
    newDesc: "Calculate tips, split bills, and check tip percentages instantly. Clean, accurate math for restaurants, bars, and delivery. Calculate now." // 140 chars
  },
  {
    url: "https://nexalc.com/percentage-calculator/",
    file: "percentage-calculator/index.html",
    type: "calculator",
    primaryKeyword: "Calculate Percentage",
    newTitle: "Calculate Percentage — Free Online Calculator | NexAlc", // 54 chars
    newDesc: "Calculate percentage increase, discounts, differences, and fractional changes in real time with exact formulas. Fast, clean math. Calculate now." // 145 chars
  },
  {
    url: "https://nexalc.com/currency-converter/",
    file: "currency-converter/index.html",
    type: "calculator",
    primaryKeyword: "Currency Converter",
    newTitle: "Currency Converter — Free Online Calculator | NexAlc", // 52 chars
    newDesc: "Convert live exchange rates across 150+ world currencies instantly with real-time foreign exchange market data. Fast and clean. Try it free." // 141 chars
  },
  {
    url: "https://nexalc.com/age-calculator/",
    file: "age-calculator/index.html",
    type: "calculator",
    primaryKeyword: "Age Calculator",
    newTitle: "Age Calculator Tool — Free Online Calculator | NexAlc", // 53 chars
    newDesc: "Calculate your exact age in years, months, weeks, and days from your date of birth instantly with leap-year precision. See your result." // 136 -> need 140-155
  },
  {
    url: "https://nexalc.com/bmi-calculator/",
    file: "bmi-calculator/index.html",
    type: "calculator",
    primaryKeyword: "BMI Calculator",
    newTitle: "BMI Calculator Tool — Free Online Calculator | NexAlc", // 53 chars
    newDesc: "Calculate your body mass index instantly using metric or imperial units. Compare your BMI category to official WHO guidelines. See your result." // 143 chars
  },
  {
    url: "https://nexalc.com/mortgage-calculator/",
    file: "mortgage-calculator/index.html",
    type: "calculator",
    primaryKeyword: "Mortgage Calculator",
    newTitle: "Mortgage Calculator — Free Online Calculator | NexAlc", // 53 chars
    newDesc: "Estimate monthly mortgage payments including principal, interest, taxes, and insurance with complete amortization schedules. Calculate now." // 140 chars
  },
  {
    url: "https://nexalc.com/countdown-timer/",
    file: "countdown-timer/index.html",
    type: "calculator",
    primaryKeyword: "Countdown Timer",
    newTitle: "Countdown Timer — Free Online Date Counter | NexAlc", // 51 chars
    newDesc: "Count down to any future date or event with live days, hours, minutes, and seconds. Share custom timer links with zero clutter. Try it free." // 142 chars
  },
  {
    url: "https://nexalc.com/countdown-timer/christmas/",
    file: "countdown-timer/christmas/index.html",
    type: "calculator",
    primaryKeyword: "Christmas Countdown",
    newTitle: "Christmas Countdown — Free Online Counter | NexAlc", // 50 chars
    newDesc: "See how many days, hours, minutes, and seconds remain until Christmas Day with a real-time live countdown timer. Accurate to the second. Try it free." // 150 chars
  },
  {
    url: "https://nexalc.com/countdown-timer/new-year-eve/",
    file: "countdown-timer/new-year-eve/index.html",
    type: "calculator",
    primaryKeyword: "New Year's Eve Countdown",
    newTitle: "New Year's Eve Countdown — Free Online Timer | NexAlc", // 53 chars
    newDesc: "Track the live countdown to New Year's Eve with real-time days, hours, minutes, and seconds ticking down to midnight globally. Try it free." // 139 -> need 140-155
  },
  {
    url: "https://nexalc.com/countdown-timer/new-year/",
    file: "countdown-timer/new-year/index.html",
    type: "calculator",
    primaryKeyword: "New Year Countdown",
    newTitle: "New Year Countdown — Free Online Timer Clock | NexAlc", // 53 chars
    newDesc: "Count down to New Year's Day with an accurate real-time clock displaying remaining days, hours, minutes, and seconds. Free and live. Try it free." // 147 chars
  },
  {
    url: "https://nexalc.com/countdown-timer/thanksgiving/",
    file: "countdown-timer/thanksgiving/index.html",
    type: "calculator",
    primaryKeyword: "Thanksgiving Countdown",
    newTitle: "Thanksgiving Countdown — Free Online Timer | NexAlc", // 51 chars
    newDesc: "Track exactly how many days, hours, minutes, and seconds remain until Thanksgiving with a live real-time countdown timer. Free to use. Try it free." // 148 chars
  },
  {
    url: "https://nexalc.com/countdown-timer/black-friday/",
    file: "countdown-timer/black-friday/index.html",
    type: "calculator",
    primaryKeyword: "Black Friday Countdown",
    newTitle: "Black Friday Countdown — Free Online Timer | NexAlc", // 51 chars
    newDesc: "See exact days, hours, minutes, and seconds remaining until Black Friday deals begin with our live real-time holiday countdown. Try it free." // 140 chars
  },
  {
    url: "https://nexalc.com/blog/15-vs-30-year-mortgage/",
    file: "blog/15-vs-30-year-mortgage/index.html",
    type: "blog",
    primaryKeyword: "15 vs 30 year mortgage",
    newTitle: "15 vs 30 Year Mortgage: Which Saves You More? | NexAlc", // 54 chars
    newDesc: "Compare monthly payments, interest totals, and lifetime equity for a 15 vs 30 year mortgage with clear numbers on a $400,000 loan. Calculate now." // 146 chars
  },
  {
    url: "https://nexalc.com/blog/fixed-vs-adjustable-rate-mortgage/",
    file: "blog/fixed-vs-adjustable-rate-mortgage/index.html",
    type: "blog",
    primaryKeyword: "fixed vs adjustable rate mortgage",
    newTitle: "Fixed vs Adjustable Rate Mortgage: What to Pick? | NexAlc", // 57 chars
    newDesc: "Evaluate fixed vs adjustable rate mortgage options with real scenarios on rate caps, monthly risk, and 5/1 ARM adjustments. See your result." // 140 chars
  },
  {
    url: "https://nexalc.com/blog/what-is-an-amortization-schedule/",
    file: "blog/what-is-an-amortization-schedule/index.html",
    type: "blog",
    primaryKeyword: "what is an amortization schedule",
    newTitle: "What Is an Amortization Schedule and How It Works | NexAlc", // 58 chars
    newDesc: "Learn what is an amortization schedule, how payment splits shift from interest to principal over time, and how extra payments save cash. Calculate now." // 152 chars
  },
  {
    url: "https://nexalc.com/blog/how-currency-exchange-rates-work/",
    file: "blog/how-currency-exchange-rates-work/index.html",
    type: "blog",
    primaryKeyword: "how to work out exchange rates",
    newTitle: "How to Work Out Exchange Rates and FX Spreads | NexAlc", // 54 chars
    newDesc: "Learn how to work out exchange rates, mid-market values, bank markups, and currency conversion fees with straightforward formulas. Calculate now." // 145 chars
  },
  {
    url: "https://nexalc.com/blog/how-much-house-can-i-afford/",
    file: "blog/how-much-house-can-i-afford/index.html",
    type: "blog",
    primaryKeyword: "how much house can i afford rule of thumb",
    newTitle: "How Much House Can I Afford? The Rule of Thumb | NexAlc", // 55 chars
    newDesc: "Find how much house can i afford rule of thumb using the 28/36 standard, income multipliers, and real down payment scenarios. See your result." // 143 chars
  },
  {
    url: "https://nexalc.com/blog/bmi-chart-for-women/",
    file: "blog/bmi-chart-for-women/index.html",
    type: "blog",
    primaryKeyword: "bmi chart women",
    newTitle: "BMI Chart Women: What Is a Healthy Range for You? | NexAlc", // 58 chars
    newDesc: "Check the official BMI chart women rely on for healthy weight categories by height, adult age brackets, and body composition. See your result." // 143 chars
  },
  {
    url: "https://nexalc.com/blog/good-mortgage-rate-right-now/",
    file: "blog/good-mortgage-rate-right-now/index.html",
    type: "blog",
    primaryKeyword: "what is a good mortgage rate",
    newTitle: "What Is a Good Mortgage Rate Right Now in 2026? | NexAlc", // 56 chars
    newDesc: "Discover what is a good mortgage rate today across 30-year fixed, 15-year, and ARM loans based on credit score tiers and trends. Calculate now." // 144 chars
  },
  {
    url: "https://nexalc.com/blog/usd-to-eur-historical-trends-explained/",
    file: "blog/usd-to-eur-historical-trends-explained/index.html",
    type: "blog",
    primaryKeyword: "usd eur exchange rate history",
    newTitle: "USD EUR Exchange Rate History & Key Trends Explained | NexAlc", // 60 chars
    newDesc: "Explore the USD EUR exchange rate history from launch-day parity to all-time highs and modern shifts with clear macroeconomic data. Try it free." // 144 chars
  },
  {
    url: "https://nexalc.com/blog/healthy-bmi-by-age/",
    file: "blog/healthy-bmi-by-age/index.html",
    type: "blog",
    primaryKeyword: "what is the best bmi for my age?",
    newTitle: "What Is the Best BMI for My Age? Healthy Ranges | NexAlc", // 56 chars
    newDesc: "Find out what is the best bmi for my age with clinical guidelines, adult age adjustments, muscle density factors, and health risks. See your result." // 149 chars
  },
  {
    url: "https://nexalc.com/blog/how-to-lower-your-bmi-practical-steps/",
    file: "blog/how-to-lower-your-bmi-practical-steps/index.html",
    type: "blog",
    primaryKeyword: "how to lower bmi quickly",
    newTitle: "How to Lower BMI Quickly: Practical Daily Steps | NexAlc", // 56 chars
    newDesc: "Learn how to lower bmi quickly and safely through measurable calorie targets, strength training, sleep habits, and timeline tracking. See your result." // 151 chars
  },
  {
    url: "https://nexalc.com/blog/bmi-vs-body-fat-percentage/",
    file: "blog/bmi-vs-body-fat-percentage/index.html",
    type: "blog",
    primaryKeyword: "bmi vs body fat",
    newTitle: "BMI vs Body Fat: What Is the Actual Difference? | NexAlc", // 56 chars
    newDesc: "Compare BMI vs body fat percentage to see when BMI misleads, why muscle mass skews results, and how to measure true body composition. See your result." // 151 chars
  },
  {
    url: "https://nexalc.com/blog/healthy-weight-for-my-height/",
    file: "blog/healthy-weight-for-my-height/index.html",
    type: "blog",
    primaryKeyword: "height weight chart",
    newTitle: "Height Weight Chart: What Is a Healthy Weight? | NexAlc", // 55 chars
    newDesc: "Review an accurate height weight chart for adult men and women to find your ideal healthy weight range and body mass target. See your result." // 141 chars
  },
  {
    url: "https://nexalc.com/blog/how-to-calculate-your-exact-age-in-days/",
    file: "blog/how-to-calculate-your-exact-age-in-days/index.html",
    type: "blog",
    primaryKeyword: "calculate age in days",
    newTitle: "Calculate Age in Days: How to Find Your Exact Age | NexAlc", // 58 chars
    newDesc: "Learn how to calculate age in days from your date of birth, factoring in leap years, calendar milestones, and exact time passed. Calculate now." // 144 chars
  },
  {
    url: "https://nexalc.com/blog/what-generation-am-i-age-ranges-explained/",
    file: "blog/what-generation-am-i-age-ranges-explained/index.html",
    type: "blog",
    primaryKeyword: "what generation am i",
    newTitle: "What Generation Am I? Exact Age Ranges Explained | NexAlc", // 57 chars
    newDesc: "Answer what generation am i with official birth year brackets for Gen Z, Millennials, Gen X, Boomers, and Silent Generation. See your result." // 142 chars
  },
  {
    url: "https://nexalc.com/blog/age-calculation-in-different-cultures/",
    file: "blog/age-calculation-in-different-cultures/index.html",
    type: "blog",
    primaryKeyword: "age calculation in different cultures",
    newTitle: "Age Calculation in Different Cultures Explained | NexAlc", // 56 chars
    newDesc: "Discover age calculation in different cultures, including Korean age, Chinese lunar calendars, and Islamic Hijri counting methods. See your result." // 148 chars
  },
  {
    url: "https://nexalc.com/blog/how-much-should-your-monthly-mortgage-payment-be/",
    file: "blog/how-much-should-your-monthly-mortgage-payment-be/index.html",
    type: "blog",
    primaryKeyword: "how much should your monthly mortgage payment be",
    newTitle: "How Much Should Your Monthly Mortgage Payment Be? | NexAlc", // 58 chars
    newDesc: "Calculate how much should your monthly mortgage payment be based on gross income, the 28% front-end cap, and total monthly debts. Calculate now." // 145 chars
  },
  {
    url: "https://nexalc.com/blog/tip-pooling-how-it-works-and-how-to-calculate-it/",
    file: "blog/tip-pooling-how-it-works-and-how-to-calculate-it/index.html",
    type: "blog",
    primaryKeyword: "tip pooling",
    newTitle: "Tip Pooling: How It Works and How to Calculate It | NexAlc", // 58 chars
    newDesc: "Understand tip pooling rules, hours-based distribution, points systems, and labor law compliance for restaurant staff. Calculate now." // 133 -> need 140-155
  },
  {
    url: "https://nexalc.com/blog/best-time-to-exchange-currency-when-travelling/",
    file: "blog/best-time-to-exchange-currency-when-travelling/index.html",
    type: "blog",
    primaryKeyword: "best time to exchange currency",
    newTitle: "Best Time to Exchange Currency When Travelling | NexAlc", // 55 chars
    newDesc: "Find the best time to exchange currency when travelling, avoid airport markups, and minimize international transaction fees. Calculate now." // 139 -> need 140-155
  },
  {
    url: "https://nexalc.com/blog/usd-to-pkr-understanding-the-exchange-rate/",
    file: "blog/usd-to-pkr-understanding-the-exchange-rate/index.html",
    type: "blog",
    primaryKeyword: "usd to pkr exchange rate",
    newTitle: "USD to PKR Exchange Rate: What Drives the Price? | NexAlc", // 57 chars
    newDesc: "Understand the USD to PKR exchange rate, what drives interbank versus open market pricing, and how remittances affect rates. Calculate now." // 139 -> need 140-155
  },
  {
    url: "https://nexalc.com/blog/mortgage-discount-points/",
    file: "blog/mortgage-discount-points/index.html",
    type: "blog",
    primaryKeyword: "mortgage discount points",
    newTitle: "Mortgage Discount Points: Are Rate Buydowns Worth It? | NexAlc", // 62 -> 50-60!
    newDesc: "Evaluate mortgage discount points, upfront fees, break-even timelines, and monthly interest savings before buying down your rate. Calculate now." // 145 chars
  },
  {
    url: "https://nexalc.com/blog/pay-off-mortgage-early/",
    file: "blog/pay-off-mortgage-early/index.html",
    type: "blog",
    primaryKeyword: "pay off mortgage early",
    newTitle: "Pay Off Mortgage Early: 5 Proven Extra Payment Steps | NexAlc", // 61 -> 50-60!
    newDesc: "Discover how to pay off mortgage early using biweekly payments, principal curtailment, and lump-sum amortization reductions. Calculate now." // 139 -> need 140-155
  }
];

console.log("Pages count:", pages.length);

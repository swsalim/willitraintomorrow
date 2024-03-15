import type { Metadata } from 'next'
import Water from '@/images/water-glass-solid.svg'

import { siteConfig } from '@/config/site'
import { PageHeader } from '@/components/PageHeader'
import { TableWaterIntake } from '@/components/TableWaterIntake'
import { WaterIntakeCalculator } from '@/components/WaterIntakeCalculator'

// export const revalidate = 60 // revalidate at most every minute
// export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: siteConfig.title,
}

export default async function Home() {
  return (
    <div className="container px-4 md:px-8">
      <div className="my-20">
        <PageHeader
          title="Find out Your Daily Water Intake"
          intro="Calculate Your Optimal Daily Hydration Needs in Seconds"
          className="mx-auto text-center"
        />
        <div className="mx-auto mt-6 w-full max-w-4xl">
          <WaterIntakeCalculator />
        </div>
      </div>
      <article className="prose">
        <h2 className="capitalize">How Much Water Should You Drink Daily?</h2>
        <p>
          Water is essential for maintaining the balance of bodily fluids. It
          helps to regulate body temperature, lubricate joints, and protect
          sensitive tissues. Water also plays a key role in digestion and
          nutrient absorption, as well as the elimination of waste products
          through urine and sweat.
        </p>
        <p>
          Proper hydration is crucial for optimal brain function and
          concentration. Even mild dehydration can impair cognitive performance,
          leading to decreased focus, fatigue, and headaches. Water is also
          important for maintaining healthy skin, as it helps to moisturize and
          nourish the skin cells.
        </p>

        <h2 className="capitalize">
          What factors influence how much water you should drink?
        </h2>
        <p>
          Several factors can influence how much water you should drink in a
          day. These include:
        </p>
        <ul>
          <li>
            <strong>Body weight</strong>: The larger the body weight, the more
            water you need to drink to stay hydrated.
          </li>

          <li>
            <strong>Physical activity</strong>: Engaging in physical activity,
            especially intense exercise, increases the body's water
            requirements.
          </li>

          <li>
            <strong>Climate</strong>: Hot and humid climates can cause increased
            sweating and fluid loss, requiring higher water intake.
          </li>

          <li>
            <strong>Health conditions</strong>: Certain health conditions, such
            as kidney stones or urinary tract infections, may require increased
            water intake.
          </li>

          <li>
            <strong>Pregnancy and breastfeeding</strong>: Pregnant and
            breastfeeding women need additional water to support the growth and
            development of the baby.
          </li>
        </ul>

        <p>
          It is important to note that individual water needs may vary, and it
          is best to consult with a healthcare professional or use a water
          intake calculator to determine your specific daily water intake.
        </p>
        <h2 className="capitalize">
          How much water should you drink in a day?
        </h2>
        <p>
          The recommended daily water intake varies depending on various
          factors, including age, gender, activity level, and overall health.
          The National Academies of Sciences, Engineering, and Medicine provides
          general guidelines for daily water intake:
        </p>
        <div className="mx-auto w-full md:max-w-3xl">
          <TableWaterIntake />
        </div>
        <p>
          These recommendations include fluids from all sources, including
          water, beverages, and food. It is important to note that these are
          general guidelines, and individual water needs may vary. It is always
          best to listen to your body and drink water when you feel thirsty.
        </p>
        <h2 className="capitalize">What are the signs of dehydration? </h2>
        <p>
          Dehydration occurs when the body loses more water than it takes in. It
          can lead to various symptoms and health problems. Some common signs of
          dehydration include:
        </p>
        <ul>
          <li>
            <strong>Thirst:</strong> Feeling thirsty is the body's way of
            signaling that it needs more water.
          </li>
          <li>
            <strong>Dry mouth and lips</strong>: Dryness of the mouth and lips
            can be a sign of dehydration.
          </li>
          <li>
            <strong>Dark-colored urine</strong>: Urine that is dark yellow or
            amber in color indicates dehydration.
          </li>
          <li>
            <strong>Fatigue and dizziness</strong>: Dehydration can cause
            fatigue, dizziness, and lightheadedness.
          </li>
          <li>
            <strong>Headaches</strong>: Lack of water can trigger headaches and
            migraines.
          </li>
          <li>
            <strong>Dry skin</strong>: Dehydration can result in dry and flaky
            skin.
          </li>
        </ul>

        <p>
          If you experience any of these symptoms, it is important to drink
          water and rehydrate your body. Severe dehydration can be
          life-threatening and may require medical attention.
        </p>
        <h2 className="capitalize">
          How can you stay hydrated throughout the day?{' '}
        </h2>
        <p>
          Staying hydrated is essential for maintaining good health and
          well-being. Here are some practical tips to help you stay hydrated
          throughout the day:
        </p>
        <ol>
          <li>
            <strong>Carry a water bottle</strong>: Keep a reusable water bottle
            with you at all times to remind yourself to drink water regularly.
          </li>
          <li>
            <strong>Set reminders</strong>: Use a hydration app or set reminders
            on your phone to drink water at regular intervals.
          </li>
          <li>
            <strong>Infuse your water</strong>: Add slices of fruits or herbs to
            your water to enhance the flavor and make it more enjoyable to
            drink.
          </li>
          <li>
            <strong>Eat water-rich foods</strong>: Include fruits and vegetables
            with high water content, such as watermelon, cucumbers, and oranges,
            in your diet.
          </li>
          <li>
            <strong>Limit caffeine and alcohol</strong>: Both caffeine and
            alcohol can have a diuretic effect, increasing fluid loss. Limit
            your intake of these beverages and drink water alongside them.
          </li>
          <li>
            <strong>Drink water before, during, and after exercise</strong>:
            Hydrate before, during, and after physical activity to replenish the
            fluids lost through sweat.
          </li>
          <li>
            <strong>Monitor urine color</strong>: Check the color of your urine.
            If it is pale yellow or clear, it indicates that you are
            well-hydrated.
          </li>
        </ol>
      </article>
    </div>
  )
}

import {
  CheckCircle,
  List,
  ClipboardCheck,
  GraduationCap,
  Target,
} from "lucide-react";

function BulletList({ items, icon: Icon }) {
  return (
    <ul className="flex flex-col gap-2.5">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-gray-600">
          <Icon className="mt-0.5 h-4 w-4 shrink-0 text-blue-500" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function Section({ title, children }) {
  return (
    <section className="flex flex-col gap-3">
      <h3 className="text-lg font-bold text-gray-900 sm:text-xl">{title}</h3>
      {children}
    </section>
  );
}

export default function DescriptionTab({ resource }) {
  return (
    <div className="flex flex-col gap-6 py-6">
      <Section title="What you'll learn">
        <BulletList items={resource.whatYouLearn} icon={CheckCircle} />
      </Section>

      <Section title="Topics covered">
        <BulletList items={resource.topicsCovered} icon={List} />
      </Section>

      <div className="grid gap-6 sm:grid-cols-2">
        <Section title="Prerequisites">
          <BulletList items={resource.prerequisites} icon={ClipboardCheck} />
        </Section>

        <Section title="Suitable for">
          <BulletList items={resource.suitableFor} icon={GraduationCap} />
        </Section>
      </div>

      <Section title="Learning outcomes">
        <BulletList items={resource.learningOutcomes} icon={Target} />
      </Section>
    </div>
  );
}

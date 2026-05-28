export interface Faq {
  question: string;
  answer: string;
}

const faqs: Faq[] = [
  {
    question: "How quickly do you respond to messages?",
    answer:
      "I typically reply within **1–2 business days**. If your message requires a longer discussion, I may take a bit more time to compose a thoughtful response.",
  },
  {
    question: "Are you open to freelance or contract work?",
    answer:
      "Yes! I'm open to freelance and contract engagements, particularly in **full-stack web development** with React, Next.js, Angular, Ruby on Rails, or Node.js. Use the form to share project details and I'll get back to you.",
  },
  {
    question: "Can I suggest a blog post topic?",
    answer:
      "Absolutely — I love topic suggestions. If there's something in **web development, open source, or software engineering** you'd like me to write about, mention it in your message.",
  },
  {
    question: "Do you accept guest posts or collaborations?",
    answer:
      "I consider collaboration requests case-by-case. If you'd like to contribute a post or co-author something, reach out with your idea and a brief outline.",
  },
  {
    question: "Can I share or quote content from your blog?",
    answer:
      "Yes, you're welcome to share or quote articles with **proper attribution** and a link back to the original post. For significant excerpts please reach out first.",
  },
  {
    question: "Do you offer code reviews or mentoring?",
    answer:
      "On a limited basis, yes. I enjoy helping developers grow. If you're looking for a **code review, pair session, or career advice**, drop me a message describing what you need.",
  },
];

export default faqs;

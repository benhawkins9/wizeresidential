/**
 * Real client testimonials ONLY. Never ship fabricated reviews — it's an FTC
 * violation and erodes the trust this whole business is built on.
 *
 * ⚠️ REVIEW: add real, approved testimonials here as you land clients. Only
 * entries with `approved: true` render on the site. Until then the social-proof
 * sections show the founder's credentials and an honest methodology instead.
 */
export interface Testimonial {
  quote: string;
  name: string;
  business: string;
  city: string;
  approved: boolean;
}

export const testimonials: Testimonial[] = [
  // Example shape (left disabled so it never renders):
  // {
  //   quote: "We went from invisible to the top of the map pack in Biloxi in about three months.",
  //   name: "Jane D.",
  //   business: "Coastal HVAC",
  //   city: "Biloxi",
  //   approved: true,
  // },
];

export const approvedTestimonials = testimonials.filter((t) => t.approved);

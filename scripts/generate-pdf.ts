import { jsPDF } from 'jspdf';
import fs from 'fs';
import path from 'path';

function generateNurseAuditKitPDF() {
  const doc = new jsPDF();

  // Title Page
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text('Nurse Offer Letter', 105, 40, { align: 'center' });
  doc.text('Audit Kit', 105, 52, { align: 'center' });

  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text('A Comprehensive Guide to Evaluating Your Nursing Job Offers', 105, 70, { align: 'center' });

  doc.setFontSize(10);
  doc.text('NurseSalaryIntel.com', 105, 280, { align: 'center' });

  // Page 2: Introduction
  doc.addPage();
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text('Introduction', 20, 20);

  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  const introText = [
    'Congratulations on receiving a nursing job offer! This audit kit will help you',
    'thoroughly evaluate your offer to ensure you\'re getting fair compensation and',
    'benefits that match your skills and experience.',
    '',
    'Use this guide to:',
    '  • Compare your offer against market rates',
    '  • Identify potential negotiation opportunities',
    '  • Understand the complete compensation package',
    '  • Make an informed decision about your career move'
  ];

  let yPos = 35;
  introText.forEach(line => {
    doc.text(line, 20, yPos);
    yPos += 7;
  });

  // Page 3: Salary Analysis Checklist
  doc.addPage();
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text('Salary Analysis Checklist', 20, 20);

  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');

  const salaryChecklist = [
    '',
    '☐ Base Salary/Hourly Rate',
    '  • How does it compare to NurseSalaryIntel.com data for your specialty?',
    '  • Is it within the expected range for your location?',
    '  • Does it reflect your years of experience?',
    '',
    '☐ Shift Differentials',
    '  • Night shift differential rate: _______',
    '  • Weekend differential rate: _______',
    '  • Holiday differential rate: _______',
    '',
    '☐ Sign-On Bonus',
    '  • Amount: $_______',
    '  • Payment schedule: _______',
    '  • Repayment clause terms: _______',
    '',
    '☐ Annual Raises',
    '  • Guaranteed percentage: _______',
    '  • Performance-based potential: _______',
    '  • Cost-of-living adjustments: _______'
  ];

  yPos = 35;
  salaryChecklist.forEach(line => {
    doc.text(line, 20, yPos);
    yPos += 7;
  });

  // Page 4: Benefits Package Review
  doc.addPage();
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text('Benefits Package Review', 20, 20);

  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');

  const benefitsChecklist = [
    '',
    '☐ Health Insurance',
    '  • Monthly premium cost: $_______',
    '  • Deductible amount: $_______',
    '  • Coverage type (HMO/PPO/HDHP): _______',
    '  • Family coverage available: Yes / No',
    '',
    '☐ Retirement Benefits',
    '  • 401(k) or 403(b) match percentage: _______',
    '  • Vesting schedule: _______',
    '  • Pension plan available: Yes / No',
    '',
    '☐ Time Off',
    '  • PTO days per year: _______',
    '  • Sick leave policy: _______',
    '  • Holidays paid: _______',
    '',
    '☐ Professional Development',
    '  • CEU reimbursement: $_______',
    '  • Certification bonuses: $_______',
    '  • Tuition assistance: $_______'
  ];

  yPos = 35;
  benefitsChecklist.forEach(line => {
    doc.text(line, 20, yPos);
    yPos += 7;
  });

  // Page 5: Work Environment Assessment
  doc.addPage();
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text('Work Environment Assessment', 20, 20);

  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');

  const environmentChecklist = [
    '',
    '☐ Scheduling',
    '  • Required shifts per pay period: _______',
    '  • Shift length: _______',
    '  • Weekend requirement: _______',
    '  • On-call requirements: _______',
    '',
    '☐ Patient Ratios',
    '  • Typical nurse-to-patient ratio: _______',
    '  • Maximum ratio allowed: _______',
    '  • Support staff availability: _______',
    '',
    '☐ Contract Terms',
    '  • Employment type (permanent/contract): _______',
    '  • Probationary period: _______',
    '  • Non-compete clause: Yes / No',
    '  • Relocation assistance: $_______'
  ];

  yPos = 35;
  environmentChecklist.forEach(line => {
    doc.text(line, 20, yPos);
    yPos += 7;
  });

  // Page 6: Negotiation Strategy
  doc.addPage();
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text('Negotiation Strategy', 20, 20);

  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');

  const negotiationText = [
    '',
    'Based on NurseSalaryIntel.com data, consider negotiating:',
    '',
    '1. Salary Adjustments',
    '   If your offer is below market average for your specialty and location,',
    '   prepare data to support a higher base salary request.',
    '',
    '2. Sign-On Bonus',
    '   If base salary has limited flexibility, negotiate a larger sign-on bonus',
    '   or better payment terms.',
    '',
    '3. Additional Benefits',
    '   • Extra PTO days',
    '   • Higher shift differentials',
    '   • Professional development budget',
    '   • Flexible scheduling options',
    '',
    'Key Points to Remember:',
    '  • Use specific data from NurseSalaryIntel.com',
    '  • Highlight your unique qualifications and experience',
    '  • Be professional and collaborative',
    '  • Get all agreements in writing',
    '  • Know your minimum acceptable offer before negotiating'
  ];

  yPos = 35;
  negotiationText.forEach(line => {
    doc.text(line, 20, yPos);
    yPos += 7;
  });

  // Page 7: Decision Matrix
  doc.addPage();
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text('Offer Decision Matrix', 20, 20);

  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');

  const matrixText = [
    '',
    'Rate each factor on a scale of 1-5 (5 being excellent):',
    '',
    '☐ Compensation (salary + bonuses)         Score: ___/5',
    '☐ Benefits package                        Score: ___/5',
    '☐ Work-life balance                       Score: ___/5',
    '☐ Career growth opportunities             Score: ___/5',
    '☐ Location/Commute                        Score: ___/5',
    '☐ Hospital/Facility reputation            Score: ___/5',
    '☐ Patient population/Specialty match      Score: ___/5',
    '☐ Team culture and support                Score: ___/5',
    '',
    '                                    TOTAL: ___/40',
    '',
    '',
    'Notes and Considerations:',
    '_____________________________________________________________',
    '',
    '_____________________________________________________________',
    '',
    '_____________________________________________________________',
    '',
    '_____________________________________________________________',
    '',
    '',
    'Final Decision:  ☐ Accept   ☐ Negotiate   ☐ Decline',
    '',
    'Action Items:',
    '_____________________________________________________________',
    '',
    '_____________________________________________________________'
  ];

  yPos = 35;
  matrixText.forEach(line => {
    doc.text(line, 20, yPos);
    yPos += 7;
  });

  // Page 8: Resources
  doc.addPage();
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text('Additional Resources', 20, 20);

  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');

  const resourcesText = [
    '',
    'NurseSalaryIntel.com Tools:',
    '',
    '  • Salary Database: Compare offers against 1000+ real nurse salaries',
    '  • Specialty Filters: Find data specific to your nursing specialty',
    '  • Location Analysis: See how location affects compensation',
    '  • Experience Level Insights: Understand salary progression',
    '',
    'How to Use NurseSalaryIntel.com:',
    '',
    '1. Visit NurseSalaryIntel.com',
    '2. Filter by your specialty, location, and experience level',
    '3. Review the salary ranges and percentiles',
    '4. Note the average benefits packages in your specialty',
    '5. Use this data to inform your negotiation strategy',
    '',
    '',
    'Remember: Knowledge is power in salary negotiations!',
    '',
    'Good luck with your offer evaluation and career decision!',
    '',
    '',
    '',
    '_______________________________________________________________',
    '',
    'For more resources and salary data, visit:',
    'NurseSalaryIntel.com',
    '',
    'Generated by NurseSalaryIntel.com'
  ];

  yPos = 35;
  resourcesText.forEach(line => {
    doc.text(line, 20, yPos);
    yPos += 7;
  });

  // Save the PDF
  const outputPath = path.join(process.cwd(), 'public', 'Nurse_Offer_Letter_Audit_Kit.pdf');
  const pdfOutput = doc.output('arraybuffer');
  fs.writeFileSync(outputPath, Buffer.from(pdfOutput));

  console.log('✅ PDF generated successfully at:', outputPath);
}

// Run the function
generateNurseAuditKitPDF();

from fpdf import FPDF
import os

class AuditKitPDF(FPDF):
    def header(self):
        self.set_fill_color(37, 99, 235)  # Professional Blue
        self.rect(0, 0, 210, 40, 'F')
        self.set_text_color(255, 255, 255)
        self.set_font('Arial', 'B', 24)
        self.cell(0, 20, 'Nurse Offer Letter Audit Kit', 0, 1, 'C')
        self.ln(10)
    def add_section(self, title, items):
        self.set_text_color(37, 99, 235)
        self.set_font('Arial', 'B', 16)
        self.cell(0, 10, title, 0, 1, 'L')
        self.set_text_color(0, 0, 0)
        self.set_font('Arial', '', 12)
        for item in items: self.multi_cell(0, 7, f'- {item}')
        self.ln(5)

pdf = AuditKitPDF()
pdf.add_page()
pdf.add_section('Compensation Checklist', ['Base Rate vs Market', 'Shift Differentials', 'Bonus Clawbacks', 'Overtime Rules'])
pdf.add_section('Contract Red Flags', ['Unsafe Floating', 'Zero-notice Termination', 'Broad Non-competes', 'Payment Penalties'])
pdf.add_section('Negotiation Scripts', ['Hourly Rate Scenarios', 'Patient Ratio Protection', 'Relocation Clauses'])
pdf.output('Nurse_Offer_Letter_Audit_Kit.pdf')
print("Complete: PDF generated as Nurse_Offer_Letter_Audit_Kit.pdf")

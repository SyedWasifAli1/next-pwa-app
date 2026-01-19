// PDF generation utility for invoices
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

export const generatePDF = async (elementId, filename = 'invoice.pdf') => {
  try {
    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error('Element not found for PDF generation');
    }

    // Use html2canvas to capture the element
    const canvas = await html2canvas(element, {
      scale: 2, // Higher resolution
      useCORS: true,
      logging: false
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');

    const imgWidth = 210; // A4 width in mm
    const pageHeight = 297; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    // Add additional pages if needed
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    // Save the PDF
    pdf.save(filename);
    return true;
  } catch (error) {
    console.error('Error generating PDF:', error);
    return false;
  }
};

export const sharePDF = async (elementId, filename = 'invoice.pdf') => {
  try {
    // First generate the PDF
    const success = await generatePDF(elementId, filename);
    if (!success) {
      throw new Error('Failed to generate PDF');
    }

    // Try to use the Web Share API if available
    if (navigator.share) {
      // Create a blob from the generated PDF (this is complex and often not fully supported)
      // For now, we'll just generate the PDF and inform the user
      await navigator.share({
        title: 'Invoice',
        text: 'Please find your invoice attached.',
        url: window.location.href
      });
    } else {
      // Fallback: just notify that PDF was generated
      alert('PDF generated successfully! Please check your downloads.');
    }
  } catch (error) {
    console.error('Error sharing PDF:', error);
    alert('Error sharing PDF: ' + error.message);
  }
};
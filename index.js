const PDFGEnrators = async (name) =>{
    const {PDFDocument ,rgb} = PDFLib;

    const exBytes = await fetch("./Cirtificate.pdf").then((res) => {
        return res.arrayBuffer()
    });
    
    const exFont = await fetch("LibreBaskerville-Bold.ttf").then(res =>{
        return res.arrayBuffer()
    });

    const pdfDoc = await PDFDocument.load(exBytes);

    pdfDoc.registerFontkit(fontkit);
    const myFont = await pdfDoc.embedFont(exFont);

    const Pages = pdfDoc.getPages();
    const F_pg = Pages[0]

    F_pg.drawText(name,{
        x:100,
        y:360,
        size: 35,
        font: myFont
    });

    const uri = await pdfDoc.saveAsBase64({dataUri: true});
    // window.open(uri);
    // document.querySelector("#mypdf").src = uri;
    saveAs(uri , "From Ashfaque Ali.pdf",{autoBom:true})
};

const SubmitBtn = document.getElementById("Submit")
const InputVal = document.querySelector("#name")

SubmitBtn.addEventListener("click",()=>{
    const val = InputVal.value;
    PDFGEnrators(val);
});


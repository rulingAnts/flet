# Field Linguistics Extension Tools (FLET)

The **Field Linguistics Extension Tools (FLET)** project is a community-driven hub for developing high-utility, cross-platform tools designed to support and streamline the work of linguistic fieldworkers.

The goal of this repository is to bridge functional gaps in a unified workflow between popular linguistic software applications like [**FLEx**](https://software.sil.org/fieldworks/), [**ELAN**](https://archive.mpi.nl/tla/elan), [**SayMore**](https://software.sil.org/saymore/), [**Dekereke**](https://casali.canil.ca/Dekereke/), and [**Phonology Assistant**](https://software.sil.org/phonologyassistant/), by providing lightweight, dedicated utilities for data collection, conversion, and crowdsourcing.

## 🚀 Ready Tools

| Tool Name | Repository | Description | Tech Stack |
| :--- | :--- | :--- | :--- |
| **[Video Annotation Tool](https://github.com/rulingAnts/videoannotationtool/)** | `rulingAnts/videoannotationtool` | A desktop tool for easily recording video-prompted data (e.g., Max Planck kits). **Exports immediately ready for ELAN/SayMore (single WAV + click-separated entries).** | Python 3.11, Tkinter, Pydub |
| **[FLEx Interlinear Copy Assistant](https://github.com/rulingAnts/flex-interlinear-copy)** | `rulingAnts/flex-interlinear-copy` | Streamlines conversion of Tab-Separated Value (TSV) interlinear text from FLEx/spreadsheets into publication-ready **LaTeX**, **XLingPaper XML**, and **HTML**. | Python 3.11, Tkinter, Pyperclip, XML, CSV |
| **[Native-Speaker Excel Transcription/Back-Translation Tool](https://github.com/rulingAnts/FlexText-Excel-Import)** | `rulingAnts/FlexText-Excel-Import` | Facilitates text collection by allowing native speakers to transcribe and back-translate using an Excel template. **Converts Excel data to FLEx-ready FlexText.** | Python 3.8+, openpyxl, lxml |
| **[Oral Text Collection Web App](https://github.com/rulingAnts/online_recorder)** | `rulingAnts/online_recorder` | Facilitates text collection by allowing native speakers to use their web browsers to record native texts, this working prototype includes audio prompts in a minority language for informed consent and metadata. | HTML5/JavaScript, PHP, Google Apps Script |
| **[OSE Interlinear Viewer](https://github.com/rulingAnts/ose-interlinear-viewer)** | `rulingAnts/ose-interlinear-viewer` | Extracts interlinear texts from a OneStory Editor project file and then displays or exports them in HTML or XLingPaper format. | HTML5/JavaScript, XSLT, Electron |
| **[FLEx XML Viewer](https://rulingants.github.io/flexml_display/)** | `rulingAnts/flexml_display` | A client-side web app for viewing, exploring, and exporting FieldWorks (FLEx) XML exports (Lists, Phonology, Wordforms) in a structured, readable format. **Runs entirely in your browser.** | HTML/JavaScript, XSLT |

## 🚀 Finished (But Not Yet Fully Uploaded) Tools

_These need GitHub repositories created with README, LICENSING, etc. The code is usable and so is the portable EXE, just not uploaded yet. All are copyright (c) 2025 Seth Johnston with AGPL3.0 License. Portable EXE links are provided below for these, they are distributed as is with no warranty or guarantee of any kind. Source code for each to be uploaded to repositories soon._

#### Dekereke Tools
1. **[Bulk Rename Files](https://drive.google.com/file/d/1mCK573e2e3hFYWs2w-zrPkD8-LZZFE9M/view?usp=sharing)** - Uses a CSV file with old and new file names to rename a bunch of files at once (useful for managing audio files).
2. **[REGEX Search Tool](https://drive.google.com/file/d/1PI5EqPNie34jCigDej6LU-KqDylgQd_y/view?usp=sharing)** - Actually kind of redundant and unimportant. Searches a Dekereke database using REGEX, but I think maybe now Dekereke actually has this built in?
3. **[Excel Import and Export](https://drive.google.com/file/d/1PI5EqPNie34jCigDej6LU-KqDylgQd_y/view?usp=sharing)** - This is actually quite useful if you want to make major layout changes or other bulk changes to your database (or to set up a database with a lot of fields and precise column order). You *can* use copy and paste functions built in to Dekereke but these can be resource intensive and often can crash or freeze. This tool converts the Dekereke Database file to an Excel file and back again. I think the Excel export function also includes filtering and sorting which can be useful in some cases as well.
4. **[Export Anki Flashcards](https://drive.google.com/file/d/1RoZrhaftJ3iXB4ApsBj4Aox2o10Jc3yT/view?usp=sharing)** - Exports a Dekereke database as Anki flashcards. If you have a "Picture" column that matches picture files in a picture folder, it can use these as well. To do in the future: make this work also with FLEx databases. Now *that* would be useful.
5. **[Sort Missing and Orphaned Files (simple)](https://drive.google.com/file/d/1RoZrhaftJ3iXB4ApsBj4Aox2o10Jc3yT/view?usp=sharing)** - *very* basic tool that compares your database and your sound files and tries to identify sound files that are orphaned or missing. This can be helpful if your sound files and database XML end up out of sync.
#### Sound File Management
1. **[Convert all WAV Files in a Folder to 16-bit](https://drive.google.com/file/d/1sKTTMdpeWXjm-t_GC-n1bKfONEYMom_T/view?usp=sharing)** - Self explanatory. Both FLEx and Dekereke work better with 16-bit wav. Turns out that's plenty high-quality enough for acoustic analysis and makes a HUGE difference in file size. FLEx "voice" writing system recordings only work with 16-bit wav.
2. **[Generate Blank WAV files (Based on a CSV Filenames list)](https://drive.google.com/file/d/1sKTTMdpeWXjm-t_GC-n1bKfONEYMom_T/view?usp=sharing)** - Believe it or not there is a use case for this. One such use case is an alternate workflow for video stimulus kits. Instead of using the video stimulus kit, you can instead generate blank wav files, and then open up a VLC playlist of video files and an list of Ocenaudio wav files side by side and work that way if you prefer.


## 💡 Planned Tools (Roadmap)

The following tools are currently in the planning or early development stages:

| Tool Name | Repository | Description | Tech Stack |
| --- | --- | --- | --- |
| **[QuickStart Android](https://github.com/rulingAnts/Quickstart_Android)** | `rulingAnts/Quickstart_Android` | A template for a simple Android app for crowdsourcing wordlist and basic text/audio collection from community members. | Android/Kotlin/Java |
| Android Text Collection Tool | TBD | A simple Android App for collecting native text recordings, including verbal informed consent and metadata. | Android/Kotlin/Java |
| FLEx TextChart to Excel Sheet Converter | TBD _(Actually this already exists but needs to include sentence and paragraph break borders and tags. Also needs a repository)_ | A simple app that converts FLEx Interlinear Text Chart XML to an Excel Spreadsheet (useful for color coding, print layout, extra note columns, etc) | Python, openpyxl, lxml |
| Biblical Language to FLEx Interlinear Text Importer | TBD | An app that imports interlinear Biblical language source text (Greek, Hebrew, Aramaic) into FLEx Interlinear view for text charting. | Python, TBD |
| Complex Concordance -> Multi-Examples Combined Text (FLEx) | TBD | A tool to take interlinear lines from a complex concordance search and generate a new combined interlinear text of multiple from these (while preserving the original reference in a note). | Python, FlexTools |
| FLEx DB Dekereke Snapshot Export Tool | TBD | A tool to export a FLEx database with sound files into a Dekereke readable form so that the user can work in FLEx but use Dekereke's advanced acoustic analysis, tone sorting, and other features. | Python, FlexTools |
| Ability to Sync Dekereke and FLEx data (distant future) | TBD | A way to sync FLEx and Dekereke data (for example between a phonologist and a syntactician or lexicographer working on different parts of a language project. | Python, FlexTools, Ollama Offline AI models |


## 🤝 Contributing

We welcome contributions from other developers and field linguists! If you have a bug fix, feature suggestion, or a new tool that fits the scope of LFET, please open an Issue or submit a Pull Request. The same is true for any and all of these tools, even the ones with incomplete (or not-yet-existent) repositories.

***

## ⚖️ Licensing and Copyright

### Documentation and Repository Structure

The content of this central repository, including this **README.md** file, the Table of Contents, and the overall repository structure, is licensed under a **Creative Commons Attribution 4.0 International License (CC BY 4.0)**.

**Copyright © 2025 Seth Johnston.**

You are free to share and adapt this documentation, provided you give appropriate credit.

### Individual Tools (Code)

**NOTE:** The source code and assets for the individual tools listed in the table above (e.g., `rulingAnts/videoannotationtool`) are hosted in their respective repositories and are governed by their own specific licenses. Please check the `LICENSE` file in each sub-project's repository for licensing details.

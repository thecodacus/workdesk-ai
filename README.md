# Workdesk AI

## Overview
Workdesk AI is a powerful document analysis tool that leverages the state-of-the-art Retrieval Augmented Generation (RAG) method to facilitate intelligent question generation and answering. With Workdesk AI, you can upload your documents and utilize advanced AI algorithms to ask questions related to the content of those documents. Whether you're a student, researcher, or professional, this tool can significantly enhance your document analysis and understanding process.

<img src="https://github.com/thecodacus/workdesk-ai/blob/10d3af11459817d9895905dc909a83c5d6431b7e/screenshots/demo-chat.png">

## Key Features
- **Document Analysis**: Upload documents in various formats, including PDF, Word, and plain text, for comprehensive analysis.
- **Question Generation**: Utilize the power of the RAG method to automatically generate intelligent questions based on the content of the uploaded documents.
- **Question Answering**: Receive accurate and relevant answers to your questions using advanced AI algorithms.
- **Natural Language Processing**: Benefit from Workdesk AI's robust natural language processing capabilities, enabling nuanced understanding of the document content.
- **User-Friendly Interface**: Enjoy a simple and intuitive user interface that makes it easy to navigate and interact with the tool.
- **Open-Source**: Workdesk AI is an open-source project, allowing users to contribute, customize, and extend its functionalities.

## How It Works
Workdesk AI combines advanced language models and natural language processing techniques to provide powerful document analysis capabilities. The tool leverages the RAG method, which enhances traditional question-answering models by incorporating a retriever component. This retriever component allows Workdesk AI to retrieve relevant information from the uploaded documents before generating accurate and contextually appropriate questions.

1. Upload your documents: Start by uploading the documents you want to analyze. Supported file formats include PDF, Word, and plain text.
2. Analyze document content: Workdesk AI uses advanced natural language processing techniques to analyze the content of your documents thoroughly.
3. Generate questions: Based on the analyzed content, Workdesk AI automatically generates intelligent questions related to the document's information.
4. Ask questions: Review the generated questions and select the ones you want to ask. You can also edit or refine the questions to suit your needs.
5. Receive answers: Submit the questions, and Workdesk AI's advanced question-answering algorithms will provide accurate and informative answers based on the content of the documents.

## Installation
To set up Workdesk AI locally, follow these steps:

1. Clone the repository:

```shell
git clone https://github.com/thecodacus/workdesk-ai.git
```

2. Navigate to the project directory:

```shell
cd workdesk-ai
```

3. Set up a virtual environment (optional but recommended):

```shell
python -m venv venv
```

4. Activate the virtual environment:

```shell
source venv/bin/activate
```

5. Install the required dependencies:

```shell
pip install .
```

6. Launch the application:

```shell
uvicorn workdesk_api.server:app --reload --host 0.0.0.0 --port 8000
```

7. Open your web browser and visit `http://localhost:8000` to access Workdesk AI.

### One Click Setup with shell script
Alternatively, you can use the provided setup script for quick installation and launch:

```shell
sh setup.sh
```

This script sets up a virtual environment, installs the dependencies, and automatically launches the tool.

### Docker
If you prefer using Docker, you can utilize the provided Docker Compose file for a one-click container setup:

```shell
docker compose up
```

## Contributing
Contributions to Workdesk AI are welcome! If you'd like to contribute to the project, please follow these steps:

1. Fork the repository on GitHub.
2. Create a new branch from the main branch with a descriptive name.
3. Make your desired changes or additions to the codebase.
4. Write tests for your changes to maintain code quality.
5. Commit your changes with clear and concise commit messages.
6. Push your changes to your forked repository.
7. Open a pull request in the main repository and provide a detailed description of your changes.

## License
Workdesk AI is released under the [Apache-2.0 License](https://github.com/thecodacus/workdesk-ai/blob/master/LICENSE).

## Support
If you encounter any issues or have any questions or suggestions, please feel free to [open an issue](https://github.com/thecodacus/workdesk-ai/issues). We appreciate your feedback and are here to assist you.

## Disclaimer
Workdesk AI is a research project and should be used for educational and informational purposes only. The tool may not always provide accurate or complete answers. We recommend verifying the information obtained from Workdesk AI with reliable sources. The developers and contributors to this project are not responsible for any misuse or consequences resulting from the use of this tool.

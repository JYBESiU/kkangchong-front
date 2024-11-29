# FitFor

운동을 처음 시작하는 휠체어 유저를 위해 간단한 운동 능력 측정을 기반으로 맞춤형 운동 동호회를 추천하는 서비스

A service recommending tailored exercise clubs for wheelchair users based on a simple physical ability assessment.

<img src='https://github.com/user-attachments/assets/acef9a52-27e0-4142-8a2a-cbbd3d26fc9c' width={600} height={400}  />

## 솔루션 개요

### 사회 문제 정의

휠체어 유저가 된 지 얼마 안 되었거나 운동을 처음 시작하는 사람들은 자신에게 맞는 운동 정보를 찾기 어렵고, 시작 방법을 알지 못해 운동에 쉽게 접근하지 못하고 있습니다. 이러한 진입 장벽은 휠체어 유저의 운동 참여를 제한하며, 높은 유병률과 건강한 삶을 유지하기 어려운 환경을 만들어냅니다.

기존에 운동 진입을 지원하는 서비스는 많지만, 휠체어 유저를 위한 서비스는 매우 드문 상황입니다. 휠체어 유저를 위한 기존 운동 동호회는 운동 진입의 어려움을 해결하려 노력하고 있지만, 운동 능력을 확인하기 위해 여러 전문가를 찾아야 하는 번거로움과, 자신이 해당 운동을 할 수 있을지 사전에 알 수 없다는 문제가 여전히 남아 있습니다.

### 솔루션의 특징 및 장점

1. **정확한 운동 능력 측정**
   
    TensorFlow의 MoveNet 모델을 활용하여, 휠체어 사용자들의 신체 주요 동작을 정확히 측정하고 평가합니다. 이를 통해 휠체어 유저는 간단히 카메라 기능을 이용해 자신의 운동 능력을 객관적으로 파악할 수 있습니다.

2. **맞춤형 운동 추천 시스템**

    측정된 운동 능력 데이터를 기반으로 LLM(Large Language Model)을 활용하여, 사용자에게 적합한 운동과 동호회를 추천합니다. 추천은 장애인 체육회의 운동별 등급 분류를 반영하여 신뢰성과 개인화된 결과를 제공합니다. 또한, 대한장애인체육회의 생활체육정보센터에 등록된 동호회 정보를 크롤링하여 사용자에게 적합한 동호회를 추천합니다.

### 기대 효과

FitFor는 운동 진입 서비스를 휠체어 유저를 대상으로 최초로 제공하며, 진입 장벽을 낮추기 위해 휴대폰 카메라를 활용한 간편한 운동 능력 측정 서비스를 제공합니다. 이를 통해 사용자는 자신에게 맞는 운동 동호회를 추천받고, 건강을 유지하기 위해 필수적인 운동을 시작할 수 있는 기회를 제공받습니다.

## 설치 및 실행 방법

### 백엔드 설치 및 실행

1. pyenv 설치
   ```bash
   # pyenv 설치 방법 (OS에 따라 다를 수 있음)
   curl https://pyenv.run | bash
   ```

2. Python 3.11.2 설치
   ```bash
   pyenv install 3.11.2
   pyenv global 3.11.2
   ```

3. 가상환경 설정
   ```bash
   python -m venv myenv
   source myenv/bin/activate  # macOS/Linux
   # myenv\Scripts\activate   # Windows
   ```

4. 의존성 설치
   ```bash
   pip install -r requirements.txt
   ```

5. 서버 실행
   ```bash
   uvicorn main:app --reload
   ```

### 프론트엔드 설치 및 실행

1. Node.js 설치 (v18)
   - [Node.js 공식 웹사이트](https://nodejs.org/ko/)에서 다운로드 및 설치

2. 레포지토리 클론
   ```bash
   git clone [레포지토리 URL]
   cd [프로젝트 폴더]
   ```

3. Yarn 설치
   ```bash
   npm install -g yarn
   ```

4. 패키지 설치 및 실행
   ```bash
   yarn
   yarn dev
   ```

## 데모 영상

(데모 영상 링크 또는 GIF 추가)
- [데모](https://fitfor.vercel.app)
## 연관 자료

- [최종 발표 자료 링크]
- [장애인생활체육지도자 지도서](https://dvoucher.kspo.or.kr/file/1.%20%EB%8C%80%ED%95%9C%EC%9E%A5%EC%95%A0%EC%9D%B8%EC%B2%B4%EC%9C%A1%ED%9A%8C_%EC%9E%A5%EC%95%A0%EC%9D%B8%EC%8A%A4%ED%8F%AC%EC%B8%A0%EC%9D%98%20%EC%9D%B4%ED%95%B4.pdf)
- 캥스터즈: https://www.kangsters-crew.com/

## 팀 소개

### 팀원

|  이름  | 소속 | 역할 | 연락처 |
|--------|-----|-----|--------|
|  기채운  | KAIST 전산학부 | 백엔드 개발, 운동 추천 API 개발 | befilledwith@kaist.ac.kr |
|  김희진  | KAIST 산업디자인학과 | 디자인, 서비스 UI 구현, 발표 자료 작성, 발표자 | h_jjin@kaist.ac.kr |
|  노서원  | KAIST 전기 및 전자공학부 | 프론트엔드 개발, 신체 능력 측정 프로세스/화면 구현 | seowonnoh@kaist.ac.kr |
|  박정원  | KAIST 전산학부 | 프론트엔드 개발, 측정 결과/운동 종목 설명 화면 구현 | pjo12346@kaist.ac.kr |
|  장원준  | KAIST 전산학부 | 백엔드 개발, 서버/DB 배포, 동호회 조회 API 개발 | wj0559@kaist.ac.kr |
|  최서영  | KAIST 산업디자인학과 | 서비스 기획, 기획서 작성, 발표자료 작성 | yury3099@kaist.ac.kr |
|  최종윤  | KAIST 전산학부 | 팀장, 프론트엔드 개발, 프로젝트 환경 설정/구조 설정, 동호회 화면 구현, API 연동 | joyo10@kaist.ac.kr |

### 멘토

| 이름 | 소속 | 역할 | 연락처 | 
|------|------|--------|------|
| 김강 | 캥스터즈 | 펠로우, 인터뷰 연결, 솔루션 피드백 | info@kang-sters.com |
| 최정인 | 카카오 모빌리티 | 멘토, 솔루션 피드백, 기술적 방향성 제시 | jungin.jin.choi@gmail.com |


----


## Solution Overview

### Social Issue Definition

Newly wheelchair-bound individuals or those starting exercise for the first time often struggle to find suitable exercise information or know where to begin. These barriers hinder wheelchair users from engaging in physical activities, increasing health risks and creating an environment that makes maintaining a healthy life challenging.

While many services support exercise initiation, services specifically for wheelchair users are rare. Existing wheelchair exercise clubs attempt to address these challenges but still require consulting multiple experts for ability assessments. Additionally, users often lack clarity on whether they can participate in certain exercises before joining.

### Solution Features & Benefits

1. **Accurate Physical Ability Assessment**  
   Utilizing TensorFlow's MoveNet model, the solution accurately measures and evaluates key movements of wheelchair users. This allows users to objectively understand their physical abilities using just a smartphone camera.

2. **Personalized Exercise Recommendation System**  
   Leveraging measured ability data and an LLM (Large Language Model), the system provides personalized exercise and club recommendations. The recommendations reflect classification standards from the Korea Paralympic Committee, ensuring credibility and tailored results. Moreover, the system crawls information from the Korea Adaptive Sports Information Center to recommend clubs suitable for each user.

### Expected Impact

FitFor is the first service targeting wheelchair users to simplify exercise initiation by offering a straightforward physical ability assessment via smartphone cameras. It lowers entry barriers, enabling users to discover exercise clubs tailored to their abilities and encouraging them to start essential physical activities for maintaining a healthy life.



## Installation and Execution

### Backend Setup and Execution

1. Install pyenv  
   ```bash
   curl https://pyenv.run | bash
   ```

2. Install Python 3.11.2  
   ```bash
   pyenv install 3.11.2
   pyenv global 3.11.2
   ```

3. Set up a virtual environment  
   ```bash
   python -m venv myenv
   source myenv/bin/activate  # macOS/Linux
   # myenv\Scripts\activate   # Windows
   ```

4. Install dependencies  
   ```bash
   pip install -r requirements.txt
   ```

5. Run the server  
   ```bash
   uvicorn main:app --reload
   ```


### Frontend Setup and Execution

1. Install Node.js (v18)  
   Download and install from [Node.js official website](https://nodejs.org/).

2. Clone the repository  
   ```bash
   git clone [Repository URL]
   cd [Project Folder]
   ```

3. Install Yarn  
   ```bash
   npm install -g yarn
   ```

4. Install packages and start the application  
   ```bash
   yarn
   yarn dev
   ```


## Demo Video

(Add a demo video link or GIF)  
- [Demo](https://fitfor.vercel.app)


## Related Materials

- [Final Presentation Link]  
- [Adaptive Sports Guidelines by the Korea Adaptive Sports Association](https://dvoucher.kspo.or.kr/file/1.%20%EB%8C%80%ED%95%9C%EC%9E%A5%EC%95%A0%EC%9D%B8%EC%B2%B4%EC%9C%A1%ED%9A%8C_%EC%9E%A5%EC%95%A0%EC%9D%B8%EC%8A%A4%ED%8F%AC%EC%B8%A0%EC%9D%98%20%EC%9D%B4%ED%95%B4.pdf)  
- Kangsters: https://www.kangsters-crew.com/


## Team Introduction

### Team Members

| Name      | Department               | Role                                  | Contact               |
|-----------|--------------------------|---------------------------------------|-----------------------|
| Chaewoon Ki | KAIST School of Computing | Backend Development, API for Sports Recommendations | befilledwith@kaist.ac.kr |
| Heejin Kim  | KAIST Industrial Design  | UI Design, Service Implementation, Presentation | h_jjin@kaist.ac.kr     |
| Seowon Noh  | KAIST School of Electrical Engineering | Frontend Development, Physical Ability Assessment Process | seowonnoh@kaist.ac.kr |
| Jungwon Park | KAIST School of Computing | Frontend Development, Results UI Development | pjo12346@kaist.ac.kr   |
| Wonjun Jang  | KAIST School of Computing | Backend Development, Server/DB Deployment, Club API | wj0559@kaist.ac.kr     |
| Seoyoung Choi | KAIST Industrial Design  | Service Planning, Documentation, Presentation | yury3099@kaist.ac.kr  |
| Jongyoon Choi  | KAIST School of Computing | Team Leader, Frontend Development, Project Setup, API Connection | joyo10@kaist.ac.kr     |

### Mentors

| Name        | Affiliation            | Role                                | Contact                 |
|-------------|------------------------|-------------------------------------|-------------------------|
| Kang Kim    | Kangsters              | Fellow, Interviewer Contact, Feedback       | info@kang-sters.com     |
| Jungin Choi | Kakao Mobility         | Mentor, Technical Guidance, Feedback | jungin.jin.choi@gmail.com |

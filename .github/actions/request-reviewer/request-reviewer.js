import { core } from '@actions/core'; 
import { github } from '@actions/github';
import { httpm } from '@actions/http-client';

const ENV_REGION_MAP = {
  dev: {
    kor: {
      lang: '한국어(dev)',
      service: '카카오웹툰(dev)',
    },
    tha: {
      lang: 'ภาษาไทย(dev)',
      service: 'KAKAO WEBTOON(dev)',
    },
  },
  prod: {
    kor: {
      lang: '한국어(prod)',
      service: '카카오웹툰(prod)',
    },
    tha: {
      lang: 'ภาษาไทย(prod)',
      service: 'KAKAO WEBTOON(prod)',
    },
  },
};


try {
  // action.yml에서 받은 input 값들을 가져옵니다.
  const region = core.getInput('region');
  const env = core.getInput('env');

  // Map에서 env, region에 맞는 값을 가져옵니다.
  const { lang, service } = ENV_REGION_MAP[env][region];

  // output 값들을 세팅해 줍니다.
  core.setOutput('lang', lang);
  core.setOutput('service', service);
} catch (error) {
  core.setFailed(error.message);
}

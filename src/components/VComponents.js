import PageWrapper from '@/components/VLayout/PageWrapper';
import PageBlock from '@/components/VLayout/PageBlock';
import FlexBox from '@/components/VLayout/FlexBox';
import FlexItem from '@/components/VLayout/FlexItem';

import VButton from '@/components/VButton';
import VCharts from '@/components/VCharts';
import VDialog from '@/components/VDialog';
import VForm from '@/components/VForm';
import VDetailForm from '@/components/VDetailForm';
import VFormItem from '@/components/VFormItem';
import VInput from '@/components/VInput';
import VInputNumber from '@/components/VInputNumber';
import VTable from '@/components/VTable';
import VTitle from '@/components/VTitle';


const plugins = {//组件
  PageWrapper,
  PageBlock,
  FlexBox,
  FlexItem,
  VButton,
  VCharts,
  VDialog,
  VForm,
  VFormItem,
  VInput,
  VInputNumber,
  VTable,
  VTitle,
  VDetailForm,
};

const directives = {//指令
}

export default {
  install(Vue, options = {}) {
    Object.keys(plugins).forEach(key => {
      Vue.component(key, plugins[key]);
    });
    Object.keys(directives).forEach(key => {
      directives[key].install(Vue, options)
    });
  }
}

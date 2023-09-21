import {ProgressBar, Audio} from 'react-loader-spinner';

/**
 * Loader component represents the Loader type rotating lines.
 */
export const LoaderProggresBar = () => {
	return <ProgressBar height="80" width="80" ariaLabel="progress-bar-loading" wrapperStyle={{}} wrapperClass="progress-bar-wrapper" borderColor="#E85973" barColor="#E85973" />;
};
export const LoaderAudio = () => {
	return (
		<Audio
		  height={100}
		  width={100}
		  color="#E85973"
		  ariaLabel="audio-loading"
		  wrapperStyle={{}}
		  wrapperClass="wrapper-class"
		  visible={true}
		/>
	);
  };
export const LoaderForm = () => {
	return (
		<Audio
		  height={100}
		  width={100}
		  color="#E85973"
		  ariaLabel="audio-loading"
		  wrapperStyle={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',  zIndex: '9999' }}
		  wrapperClass="wrapper-class"
		  visible={true}
		/>
	);
  };
  

import { useEffect } from 'react';

const useDocumentTitle = (title, index = true) => {
	useEffect(() => {
		document.title = title;

		const metaTag = document.querySelector('meta[name="robots"]');
		if (index) {
			if (metaTag) {
				metaTag.remove();
			}
		} else {
			if (!metaTag) {
				const newMetaTag = document.createElement('meta');
				newMetaTag.name = 'robots';
				newMetaTag.content = 'noindex';
				document.head.appendChild(newMetaTag);
			} else {
				metaTag.content = 'noindex';
			}
		}
	}, [title, index]);
};

export default useDocumentTitle;

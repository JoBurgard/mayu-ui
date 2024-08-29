export function htmlEncode(text: string) {
	return text
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;')
		.replaceAll("'", '&apos;')
		.replaceAll('"', '&quot;');
}

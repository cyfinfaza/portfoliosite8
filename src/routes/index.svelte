<script>
	import Site from '../components/Site.svelte';
	import sites from '../data/sites.json';
	console.log(sites);
</script>

<div class="container">
	<div class="sites">
		<div class="header vertiPanel">
			<div class="horizPanel" style="gap: 16px;">
				<img src="/c_general.svg" alt="" />
				<div class="vertiPanel">
					<h1>Hi, I'm Cy.</h1>
					<p>And this is my landing page. It's nice to meet you!</p>
				</div>
			</div>
			<div class="buttons">
				<a href="https://github.com/cyfinfaza">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
						><path
							d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
						/></svg
					>GitHub</a
				>
				<a href="https://www.linkedin.com/in/cy-westbrook-925b25205/">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
						><path
							d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
						/></svg
					>LinkedIn</a
				>
				<a href="mailto:hi@cy2.me">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"
						><path
							d="M6.542 34.583Q4.708 34.583 3.417 33.25Q2.125 31.917 2.125 30.167V9.833Q2.125 8.042 3.417 6.708Q4.708 5.375 6.542 5.375H33.458Q35.292 5.375 36.604 6.708Q37.917 8.042 37.917 9.833V30.167Q37.917 31.917 36.604 33.25Q35.292 34.583 33.458 34.583ZM20 22.125Q20.292 22.125 20.562 22.042Q20.833 21.958 21.208 21.75L32.792 14.083Q33.042 13.917 33.25 13.583Q33.458 13.25 33.458 12.75Q33.458 11.958 32.667 11.417Q31.875 10.875 31.083 11.458L20 18.708L8.958 11.458Q8.167 10.958 7.354 11.396Q6.542 11.833 6.542 12.75Q6.542 13.208 6.75 13.542Q6.958 13.875 7.25 14.083L18.792 21.75Q19.167 21.958 19.438 22.042Q19.708 22.125 20 22.125Z"
						/></svg
					>Email</a
				>
			</div>
		</div>
		{#each Object.keys(sites) as site, index}
			<Site site={{
				title: site,
				...sites[site]
			}} {index} />
		{/each}
	</div>
</div>

<style lang="scss">
	.header {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 24px;
		padding: 32px;
		/* position: sticky;
		top: 0;
		z-index: 20;
		background: radial-gradient(#0008, #0000); */
	}
	.buttons {
		display: grid;
		width: 100%;
		gap: 8px;
		grid-template-columns: repeat(3, 1fr);
		a {
			padding: 12px;
			border-radius: 8px;
			border: 1px solid #282828;
			text-decoration: none;
			display: flex;
			align-items: center;
			justify-content: center;
			gap: 8px;
			transition: 120ms;
			svg {
				height: 1.5em;
			}
			&:hover {
				background: #181818;
				transform: translateY(-2px);
			}
		}
	}
	.sites {
		display: grid;
		/* auto fill columns */
		grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
	}
</style>

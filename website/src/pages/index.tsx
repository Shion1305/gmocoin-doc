import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/getting-started/introduction">
            Get Started →
          </Link>
        </div>
      </div>
    </header>
  );
}

function HomepageFeatures() {
  const features = [
    {
      title: 'Public API',
      description: 'Access real-time market data including ticker information, order books, trade history, and KLine data without authentication.',
      link: '/docs/public-api',
    },
    {
      title: 'Private API',
      description: 'Manage your account, trading, orders, and positions with secure authenticated endpoints. Full control over your GMO Coin account.',
      link: '/docs/private-api',
    },
    {
      title: 'WebSocket API',
      description: 'Real-time streaming data for both public market data and private account updates. Low-latency event notifications.',
      link: '/docs/websocket',
    },
    {
      title: 'Multi-Language Support',
      description: 'Code examples in 10+ programming languages including Node.js, Python, Go, Ruby, PHP, Kotlin, C#, Rust, Haskell, and Swift.',
      link: '/docs/getting-started/authentication',
    },
  ];

  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {features.map((feature, idx) => (
            <div key={idx} className="col col--6" style={{marginBottom: '2rem'}}>
              <div className="text--center padding-horiz--md">
                <Heading as="h3">{feature.title}</Heading>
                <p>{feature.description}</p>
                <Link className="button button--secondary" to={feature.link}>
                  Learn More →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title="Home"
      description="Comprehensive API documentation for GMO Coin cryptocurrency exchange">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}

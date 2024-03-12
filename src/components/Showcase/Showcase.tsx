import classes from './Showcase.module.css';

const Showcase = () => {
    return (
        <div>
            <div className={classes.header}>
            <div className={classes.titleButtons}>
                <div className={classes.title}>
                <div className={classes.titleOverhead}>
                    <div className={classes.title2}>The platform for better collaboration</div>
                </div>
                <div className={classes.body}>
                    <div className={classes.textBlock}>Empower your data journey with </div>
                    <div className={classes.textBlock2}>
                    DataWeave: FeatureMesh. Seamlessly interconnect, intelligently analyze.
                    </div>
                </div>
                </div>
            </div>
            <div className={classes.animation}></div>
            </div>
        </div>
    )
}

export default Showcase;